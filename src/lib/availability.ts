import { connectDB } from "@/lib/mongodb";
import { Availability } from "@/models/Availability";
import type { DaySchedule } from "@/models/Availability";
import { Booking } from "@/models/Booking";

/** Arizona — no DST; stable for booking calendar math */
const BOOKING_TZ = "America/Phoenix";

export const DEFAULT_OPERATING_DAYS: DaySchedule[] = Array.from(
  { length: 7 },
  (_, day) => ({
    day,
    open: "05:00",
    close: "17:00",
    closed: false,
  })
);

const DEFAULT_CONFIG = {
  operatingDays: DEFAULT_OPERATING_DAYS,
  appointmentIntervalMinutes: 60,
  maxBookingsPerDay: 6,
  blockedDates: [] as Date[],
  vacationDates: [] as Date[],
  blockedTimeSlots: [] as { date: Date; time: string; reason?: string }[],
  minAdvanceNoticeHours: 24,
  maxFutureBookingDays: 90,
};

function phoenixDateString(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: BOOKING_TZ }).format(date);
}

function phoenixWeekday(dateStr: string): number {
  const d = new Date(`${dateStr}T12:00:00-07:00`);
  return d.getDay();
}

export function ensureOperatingDays(
  days: DaySchedule[] | undefined | null
): DaySchedule[] {
  if (!days?.length) return DEFAULT_OPERATING_DAYS;
  const byDay = new Map<number, DaySchedule>();
  for (const entry of days) {
    const day = Number(entry.day);
    if (Number.isNaN(day) || day < 0 || day > 6) continue;
    byDay.set(day, {
      day,
      open: entry.open || "05:00",
      close: entry.close || "17:00",
      closed: Boolean(entry.closed),
    });
  }
  if (byDay.size === 0) return DEFAULT_OPERATING_DAYS;
  return Array.from({ length: 7 }, (_, day) =>
    byDay.get(day) ?? {
      day,
      open: "05:00",
      close: "17:00",
      closed: false,
    }
  );
}

export async function getAvailabilityConfig() {
  const conn = await connectDB();
  if (!conn) {
    return { ...DEFAULT_CONFIG };
  }

  let config = await Availability.findOne().lean();
  if (!config) {
    const created = await Availability.create(DEFAULT_CONFIG);
    config = created.toObject();
  }

  const operatingDays = ensureOperatingDays(config.operatingDays);
  if (!config.operatingDays?.length) {
    await Availability.updateOne({}, { $set: { operatingDays } });
  }

  return {
    ...config,
    operatingDays,
    appointmentIntervalMinutes:
      config.appointmentIntervalMinutes ?? DEFAULT_CONFIG.appointmentIntervalMinutes,
    maxBookingsPerDay:
      config.maxBookingsPerDay ?? DEFAULT_CONFIG.maxBookingsPerDay,
    minAdvanceNoticeHours:
      config.minAdvanceNoticeHours ?? DEFAULT_CONFIG.minAdvanceNoticeHours,
    maxFutureBookingDays:
      config.maxFutureBookingDays ?? DEFAULT_CONFIG.maxFutureBookingDays,
    blockedDates: config.blockedDates ?? [],
    vacationDates: config.vacationDates ?? [],
    blockedTimeSlots: config.blockedTimeSlots ?? [],
  };
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
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return [];

  const config = await getAvailabilityConfig();
  const day = phoenixWeekday(dateStr);
  const schedule = config.operatingDays.find((d) => d.day === day);

  if (!schedule || schedule.closed) return [];

  const selectedPhoenix = dateStr;

  const isBlocked = [...config.blockedDates, ...config.vacationDates].some(
    (d: Date) => phoenixDateString(new Date(d)) === selectedPhoenix
  );
  if (isBlocked) return [];

  const now = new Date();
  const earliest = new Date(
    now.getTime() + config.minAdvanceNoticeHours * 60 * 60 * 1000
  );
  const earliestStr = phoenixDateString(earliest);
  if (selectedPhoenix < earliestStr) return [];

  const maxFuture = new Date(now);
  maxFuture.setDate(maxFuture.getDate() + config.maxFutureBookingDays);
  if (selectedPhoenix > phoenixDateString(maxFuture)) return [];

  const open = parseTime(schedule.open);
  const close = parseTime(schedule.close);
  const interval = config.appointmentIntervalMinutes;
  const slots: string[] = [];

  for (let t = open; t + interval <= close; t += interval) {
    slots.push(formatSlot(t));
  }

  const dayStart = new Date(`${dateStr}T00:00:00-07:00`);
  const dayEnd = new Date(`${dateStr}T23:59:59-07:00`);

  const blocked = config.blockedTimeSlots.filter(
    (b: { date: Date }) => phoenixDateString(new Date(b.date)) === selectedPhoenix
  );

  let taken = new Set<string>(blocked.map((b: { time: string }) => b.time));

  try {
    const conn = await connectDB();
    if (conn) {
      const confirmed = await Booking.find({
        preferredDate: { $gte: dayStart, $lte: dayEnd },
        status: { $in: ["Confirmed", "In Progress"] },
      }).select("preferredTime");

      const count = await Booking.countDocuments({
        preferredDate: { $gte: dayStart, $lte: dayEnd },
        status: { $in: ["Confirmed", "In Progress"] },
      });

      if (count >= config.maxBookingsPerDay) return [];

      taken = new Set([
        ...taken,
        ...confirmed.map((b: { preferredTime: string }) => b.preferredTime),
      ]);
    }
  } catch {
    // Still offer slots when DB booking lookup fails
  }

  return slots.filter((s) => !taken.has(s));
}

export async function isSlotAvailable(dateStr: string, time: string) {
  const slots = await getAvailableSlots(dateStr);
  return slots.includes(time);
}
