import { withAdminAuth } from "@/lib/api-auth";
import { DEFAULT_OPERATING_DAYS } from "@/lib/availability";
import { connectDB } from "@/lib/mongodb";
import { Availability } from "@/models/Availability";

const DEFAULTS = {
  operatingDays: DEFAULT_OPERATING_DAYS,
  appointmentIntervalMinutes: 60,
  maxBookingsPerDay: 6,
  minAdvanceNoticeHours: 24,
  maxFutureBookingDays: 90,
};

export async function GET() {
  return withAdminAuth(async () => {
    await connectDB();
    let config = await Availability.findOne();
    if (!config) config = await Availability.create(DEFAULTS);
    return Response.json(config);
  });
}

export async function PATCH(request: Request) {
  return withAdminAuth(async () => {
    await connectDB();
    const config = await Availability.findOneAndUpdate(
      {},
      await request.json(),
      { new: true, upsert: true }
    );
    return Response.json(config);
  });
}
