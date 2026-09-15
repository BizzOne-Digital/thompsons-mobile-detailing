import { Schema, models, model } from "mongoose";

export interface VehiclePrices {
  sedan?: number;
  midsize?: number;
  large?: number;
}

export interface IService {
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  images: { url: string; alt: string; publicId?: string }[];
  features: string[];
  exclusions: string[];
  vehiclePrices: VehiclePrices;
  startingPrice: number;
  customQuote: boolean;
  estimatedDuration?: string;
  active: boolean;
  featured: boolean;
  displayOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    category: { type: String, required: true, index: true },
    images: [
      {
        url: String,
        alt: String,
        publicId: String,
      },
    ],
    features: [String],
    exclusions: [String],
    vehiclePrices: {
      sedan: Number,
      midsize: Number,
      large: Number,
    },
    startingPrice: { type: Number, default: 0 },
    customQuote: { type: Boolean, default: false },
    estimatedDuration: String,
    active: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true }
);

export const Service =
  models.Service || model<IService>("Service", ServiceSchema);
