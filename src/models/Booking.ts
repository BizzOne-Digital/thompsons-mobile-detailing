import mongoose, { Schema, models, model } from "mongoose";
import { BOOKING_STATUSES } from "@/lib/constants";

export interface IBooking {
  customerName: string;
  email: string;
  phone: string;
  preferredContactMethod: string;
  serviceId: mongoose.Types.ObjectId;
  serviceName: string;
  vehicleType: string;
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleColor?: string;
  vehicleCondition?: string;
  addOns: { addOnId?: mongoose.Types.ObjectId; name: string; price: number }[];
  preferredDate: Date;
  preferredTime: string;
  alternateDate?: Date;
  alternateTime?: string;
  address: string;
  city: string;
  zip: string;
  locationType: string;
  accessInstructions?: string;
  petHair: boolean;
  majorStains: boolean;
  odorTreatment: boolean;
  customerNotes?: string;
  photos: { url: string; publicId?: string }[];
  estimatedPrice: number;
  adjustedPrice?: number;
  status: (typeof BOOKING_STATUSES)[number];
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    preferredContactMethod: { type: String, required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    serviceName: { type: String, required: true },
    vehicleType: { type: String, required: true },
    vehicleYear: String,
    vehicleMake: String,
    vehicleModel: String,
    vehicleColor: String,
    vehicleCondition: String,
    addOns: [
      {
        addOnId: Schema.Types.ObjectId,
        name: String,
        price: Number,
      },
    ],
    preferredDate: { type: Date, required: true, index: true },
    preferredTime: { type: String, required: true, index: true },
    alternateDate: Date,
    alternateTime: String,
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    locationType: { type: String, required: true },
    accessInstructions: String,
    petHair: { type: Boolean, default: false },
    majorStains: { type: Boolean, default: false },
    odorTreatment: { type: Boolean, default: false },
    customerNotes: String,
    photos: [{ url: String, publicId: String }],
    estimatedPrice: { type: Number, required: true },
    adjustedPrice: Number,
    status: {
      type: String,
      enum: BOOKING_STATUSES,
      default: "New",
      index: true,
    },
    internalNotes: String,
  },
  { timestamps: true }
);

BookingSchema.index({ preferredDate: 1, preferredTime: 1, status: 1 });

export const Booking =
  models.Booking || model<IBooking>("Booking", BookingSchema);
