/** Repair empty availability schedule — run: npx tsx scripts/patch-availability.ts */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DEFAULT_OPERATING_DAYS } from "../src/lib/availability";

dotenv.config({ path: ".env.local" });
dotenv.config();

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required");
    process.exit(1);
  }
  await mongoose.connect(uri);
  const { Availability } = await import("../src/models/Availability");

  await Availability.findOneAndUpdate(
    {},
    {
      $set: {
        operatingDays: DEFAULT_OPERATING_DAYS,
        appointmentIntervalMinutes: 60,
        maxBookingsPerDay: 6,
        minAdvanceNoticeHours: 24,
        maxFutureBookingDays: 90,
      },
    },
    { upsert: true }
  );

  console.log("Availability schedule repaired (7 days, 5 AM–5 PM).");
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
