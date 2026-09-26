import { Schema, models, model } from "mongoose";

export interface DaySchedule {
  day: number; // 0 Sunday - 6 Saturday
  open: string;
  close: string;
  closed: boolean;
}

export interface IAvailability {
  operatingDays: DaySchedule[];
  appointmentIntervalMinutes: number;
  maxBookingsPerDay: number;
  blockedDates: Date[];
  vacationDates: Date[];
  blockedTimeSlots: { date: Date; time: string; reason?: string }[];
  minAdvanceNoticeHours: number;
  maxFutureBookingDays: number;
  createdAt: Date;
  updatedAt: Date;
}

const AvailabilitySchema = new Schema<IAvailability>(
  {
    operatingDays: [
      {
        day: Number,
        open: String,
        close: String,
        closed: Boolean,
      },
    ],
    appointmentIntervalMinutes: { type: Number, default: 60 },
    maxBookingsPerDay: { type: Number, default: 6 },
    blockedDates: [Date],
    vacationDates: [Date],
    blockedTimeSlots: [{ date: Date, time: String, reason: String }],
    minAdvanceNoticeHours: { type: Number, default: 24 },
    maxFutureBookingDays: { type: Number, default: 90 },
  },
  { timestamps: true }
);

export const Availability =
  models.Availability || model<IAvailability>("Availability", AvailabilitySchema);
