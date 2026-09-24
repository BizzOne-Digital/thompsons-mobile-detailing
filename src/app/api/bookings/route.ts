import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { isSlotAvailable } from "@/lib/availability";
import { BRAND } from "@/lib/constants";
import {
  bookingAdminEmailHtml,
  bookingAdminEmailText,
  bookingCustomerEmailHtml,
  bookingCustomerEmailText,
  sendMail,
} from "@/lib/email";
import { calculateBookingTotal } from "@/lib/pricing";
import {
  normalizeBookingBody,
  pickBookingPersistFields,
  shouldVerifySlot,
} from "@/lib/booking-normalize";
import {
  bookingSchema,
  validateBookingRequiredFields,
} from "@/lib/validations";
import { filterAddOnsForPackageBooking } from "@/lib/booking-add-ons";
import { getAddOnPrice } from "@/lib/pricing";
import { apiError } from "@/lib/utils";
import { AddOn } from "@/models/AddOn";
import { Booking } from "@/models/Booking";
import { Service } from "@/models/Service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!bookingSchema.safeParse(body).success) {
      return apiError("Invalid booking request", 400);
    }

    const data = normalizeBookingBody(body as Record<string, unknown>);

    const requiredError = validateBookingRequiredFields(data);
    if (requiredError) {
      return apiError(requiredError, 400);
    }

    const conn = await connectDB();
    if (!conn) {
      return apiError(
        "Booking system is temporarily unavailable. Please call us at 623-999-7500.",
        503
      );
    }

    let service = mongoose.isValidObjectId(data.serviceId)
      ? await Service.findById(data.serviceId)
      : null;
    if (!service?.active) {
      service = await Service.findOne({ active: true }).sort({
        displayOrder: 1,
      });
    }
    if (!service) {
      return apiError(
        "No services are configured. Please call us at 623-999-7500.",
        503
      );
    }
    data.serviceId = String(service._id);

    if (shouldVerifySlot(data.preferredTime)) {
      const available = await isSlotAvailable(
        data.preferredDate,
        data.preferredTime
      );
      if (!available) {
        data.customerNotes = [
          data.customerNotes,
          `Requested time "${data.preferredTime}" — please confirm availability.`,
        ]
          .filter(Boolean)
          .join("\n");
        data.preferredTime = "To be confirmed";
      }
    }

    const validAddOnIds = data.addOnIds.filter((id) =>
      mongoose.isValidObjectId(id)
    );
    let addOnDocs = validAddOnIds.length
      ? await AddOn.find({ _id: { $in: validAddOnIds }, active: true })
      : [];
    addOnDocs = filterAddOnsForPackageBooking(addOnDocs, service.slug).filter((a) =>
      validAddOnIds.includes(String(a._id))
    );

    const estimatedPrice = calculateBookingTotal(
      service,
      data.vehicleType,
      addOnDocs
    );

    const bookingFields = pickBookingPersistFields(data);

    const booking = await Booking.create({
      ...bookingFields,
      serviceId: service._id,
      serviceName: service.name,
      addOns: addOnDocs.map((a) => ({
        addOnId: a._id,
        name: a.name,
        price: getAddOnPrice(a, data.vehicleType),
      })),
      preferredDate: new Date(data.preferredDate + "T12:00:00-07:00"),
      alternateDate: data.alternateDate
        ? new Date(data.alternateDate + "T12:00:00-07:00")
        : undefined,
      estimatedPrice,
      status: "New",
    });

    const customerMail = await sendMail({
      to: data.email,
      subject: `Your booking request — ${BRAND.name}`,
      replyTo: BRAND.email,
      text: bookingCustomerEmailText({
        customerName: data.customerName,
        serviceName: service.name,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        estimatedPrice,
      }),
      html: bookingCustomerEmailHtml({
        customerName: data.customerName,
        serviceName: service.name,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        estimatedPrice,
      }),
    });

    const notifyEmail =
      process.env.BOOKING_NOTIFICATION_EMAIL?.trim() || BRAND.email;
    const adminPayload = {
      Customer: data.customerName,
      Email: data.email,
      Phone: data.phone,
      Service: service.name,
      Date: data.preferredDate,
      Time: data.preferredTime,
      Estimate: `$${estimatedPrice}`,
      "Booking ID": booking._id.toString(),
    };
    const adminMail = await sendMail({
      to: notifyEmail,
      subject: `New booking: ${data.customerName} — ${service.name}`,
      replyTo: data.email,
      text: bookingAdminEmailText(adminPayload),
      html: bookingAdminEmailHtml(adminPayload),
    });

    const emailConfigured = customerMail.ok && adminMail.ok;

    return Response.json({
      ok: true,
      bookingId: booking._id.toString(),
      estimatedPrice,
      emailConfigured,
      message: emailConfigured
        ? "Your booking request has been submitted and is pending review. We will contact you to confirm."
        : "Your booking request was saved. We will contact you using the phone or email you provided.",
    });
  } catch (err) {
    console.error("[bookings] POST failed:", err);
    return apiError(
      "We could not save your booking. Please try again or call 623-999-7500.",
      500
    );
  }
}
