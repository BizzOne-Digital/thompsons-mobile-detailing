import { Schema, models, model } from "mongoose";

export type MarketingLeadSource =
  | "popup_email"
  | "promo_claim"
  | "booking_abandoned";

export interface IMarketingLead {
  email: string;
  name?: string;
  phone?: string;
  source: MarketingLeadSource;
  promoCode?: string;
  pagePath?: string;
  bookingStep?: number;
  serviceName?: string;
  followUpSentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MarketingLeadSchema = new Schema<IMarketingLead>(
  {
    email: { type: String, required: true, index: true },
    name: String,
    phone: String,
    source: {
      type: String,
      enum: ["popup_email", "promo_claim", "booking_abandoned"],
      required: true,
      index: true,
    },
    promoCode: String,
    pagePath: String,
    bookingStep: Number,
    serviceName: String,
    followUpSentAt: Date,
  },
  { timestamps: true }
);

MarketingLeadSchema.index({ email: 1, source: 1, createdAt: -1 });

export const MarketingLead =
  models.MarketingLead ||
  model<IMarketingLead>("MarketingLead", MarketingLeadSchema);
