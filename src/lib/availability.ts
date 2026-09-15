import { connectDB } from "@/lib/mongodb";
import { Availability } from "@/models/Availability";
import { Booking } from "@/models/Booking";

const DEFAULT_DAYS = Array.from({ length: 7 }, (_, day) => ({
  day,
  open: "05:00",
  close: "17:00",
  closed: false,
}));

export async function getAvailabilityConfig() {
  const conn = await connectDB();
  if (!conn) {
    return {
      operatingDays: DEFAULT_DAYS,
      appointmentIntervalMinutes: 60,
      maxBookingsPerDay: 6,
      blockedDates: [],
      vacationDates: [],
      blockedTimeSlots: [],
      minAdvanceNoticeHours: 24,
      maxFutureBookingDays: 90,
    };
  }
  let config = await Availability.findOne().lean();
  if (!config) {
    const created = await Availability.create({
      operatingDays: DEFAULT_DAYS,
    });
    config = created.toObject();
  }
  return config;
}

function parseTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function formatSlot(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

export async function getAvailableSlots(dateStr: string) {
  const config = await getAvailabilityConfig();
  const date = new Date(dateStr + "T12:00:00");
  const day = date.getDay();
  const schedule = config.operatingDays.find(
    (d: { day: number }) => d.day === day
  );

  if (!schedule || schedule.closed) return [];

  const isBlocked = config.blockedDates.some(
    (d: Date) => new Date(d).toDateString() === date.toDateString()
  );
  if (isBlocked) return [];

  const minNotice = new Date();
  minNotice.setHours(minNotice.getHours() + config.minAdvanceNoticeHours);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + config.maxFutureBookingDays);

  if (date < new Date(minNotice.toDateString()) || date > maxDate) {
    return [];
  }

  const open = parseTime(schedule.open);
  const close = parseTime(schedule.close);
  const interval = config.appointmentIntervalMinutes;
  const slots: string[] = [];

  for (let t = open; t + interval <= close; t += interval) {
    slots.push(formatSlot(t));
  }

  const dayStart = new Date(dateStr + "T00:00:00");
  const dayEnd = new Date(dateStr + "T23:59:59");

  const confirmed = await Booking.find({
    preferredDate: { $gte: dayStart, $lte: dayEnd },
    status: { $in: ["Confirmed", "In Progress"] },
  }).select("preferredTime");

  const blocked = config.blockedTimeSlots.filter(
    (b: { date: Date }) =>
      new Date(b.date).toDateString() === date.toDateString()
  );

  const taken = new Set([
    ...confirmed.map((b: { preferredTime: string }) => b.preferredTime),
    ...blocked.map((b: { time: string }) => b.time),
  ]);

  const count = await Booking.countDocuments({
    preferredDate: { $gte: dayStart, $lte: dayEnd },
    status: { $nin: ["Cancelled", "No Show"] },
  });

  if (count >= config.maxBookingsPerDay) return [];

  return slots.filter((s) => !taken.has(s));
}

export async function isSlotAvailable(dateStr: string, time: string) {
  const slots = await getAvailableSlots(dateStr);
  return slots.includes(time);
}
