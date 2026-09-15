import { Schema, models, model } from "mongoose";

export interface IAddOn {
  name: string;
  slug: string;
  description: string;
  pricingType: "fixed" | "starting" | "vehicle";
  fixedPrice?: number;
  vehiclePrices?: { sedan?: number; midsize?: number; large?: number };
  serviceSlugs: string[];
  active: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const AddOnSchema = new Schema<IAddOn>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    pricingType: {
      type: String,
      enum: ["fixed", "starting", "vehicle"],
      default: "fixed",
    },
    fixedPrice: Number,
    vehiclePrices: {
      sedan: Number,
      midsize: Number,
      large: Number,
    },
    serviceSlugs: [String],
    active: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const AddOn = models.AddOn || model<IAddOn>("AddOn", AddOnSchema);
