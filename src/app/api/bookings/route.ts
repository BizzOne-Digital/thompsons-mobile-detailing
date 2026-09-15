import { connectDB } from "@/lib/mongodb";
import { isSlotAvailable } from "@/lib/availability";
import {
  bookingAdminEmailHtml,
  bookingCustomerEmailHtml,
  sendMail,
} from "@/lib/email";
import { calculateBookingTotal } from "@/lib/pricing";
import { bookingSchema } from "@/lib/validations";
import { apiError } from "@/lib/utils";
import { AddOn } from "@/models/AddOn";
import { Booking } from "@/models/Booking";
import { Service } from "@/models/Service";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid booking data");
  }

  const data = parsed.data;
  await connectDB();

  const service = await Service.findById(data.serviceId);
  if (!service || !service.active) {
    return apiError("Selected service is not available", 400);
  }

  const available = await isSlotAvailable(data.preferredDate, data.preferredTime);
  if (!available) {
    return apiError("Selected time slot is no longer available", 409);
  }

  const addOnDocs = data.addOnIds.length
    ? await AddOn.find({ _id: { $in: data.addOnIds }, active: true })
    : [];

  const estimatedPrice = calculateBookingTotal(
    service,
    data.vehicleType,
    addOnDocs
  );

  const booking = await Booking.create({
    ...data,
    serviceId: service._id,
    serviceName: service.name,
    addOns: addOnDocs.map((a) => ({
      addOnId: a._id,
      name: a.name,
      price: a.fixedPrice ?? 0,
    })),
    preferredDate: new Date(data.preferredDate + "T12:00:00"),
    alternateDate: data.alternateDate
      ? new Date(data.alternateDate + "T12:00:00")
      : undefined,
    estimatedPrice,
    status: "New",
  });

  await sendMail({
    to: data.email,
    subject: "Booking Request Received — Pending Review",
    html: bookingCustomerEmailHtml({
      customerName: data.customerName,
      serviceName: service.name,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      estimatedPrice,
    }),
  });

  const notifyEmail = process.env.BOOKING_NOTIFICATION_EMAIL;
  if (notifyEmail) {
    await sendMail({
      to: notifyEmail,
      subject: `New Booking Request — ${data.customerName}`,
      html: bookingAdminEmailHtml({
        Customer: data.customerName,
        Email: data.email,
        Phone: data.phone,
        Service: service.name,
        Date: data.preferredDate,
        Time: data.preferredTime,
        Estimate: `$${estimatedPrice}`,
      }),
    });
  }

  return Response.json({
    ok: true,
    bookingId: booking._id.toString(),
    estimatedPrice,
    message:
      "Your booking request has been submitted and is pending review. We will contact you to confirm.",
  });
}
