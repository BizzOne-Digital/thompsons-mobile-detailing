import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { apiError } from "@/lib/utils";
import { Booking } from "@/models/Booking";
import { BOOKING_STATUSES } from "@/lib/constants";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return withAdminAuth(async () => {
    await connectDB();
    const booking = await Booking.findById(id).lean();
    if (!booking) return apiError("Not found", 404);
    return Response.json(booking);
  });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return withAdminAuth(async () => {
    const body = await request.json();
    await connectDB();
    const update: Record<string, unknown> = {};
    if (body.status && BOOKING_STATUSES.includes(body.status)) {
      update.status = body.status;
    }
    if (typeof body.internalNotes === "string") {
      update.internalNotes = body.internalNotes;
    }
    if (typeof body.adjustedPrice === "number") {
      update.adjustedPrice = body.adjustedPrice;
    }
    if (body.preferredDate) {
      update.preferredDate = new Date(body.preferredDate + "T12:00:00");
    }
    if (body.preferredTime) update.preferredTime = body.preferredTime;

    const booking = await Booking.findByIdAndUpdate(id, update, {
      new: true,
    }).lean();
    if (!booking) return apiError("Not found", 404);
    return Response.json(booking);
  });
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return withAdminAuth(async () => {
    await connectDB();
    await Booking.findByIdAndDelete(id);
    return Response.json({ ok: true });
  });
}
