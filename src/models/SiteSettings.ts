import { Schema, models, model } from "mongoose";
import { BRAND, SERVICE_AREAS } from "@/lib/constants";

export interface ISiteSettings {
  businessName: string;
  tagline: string;
  mainHeadline: string;
  aboutText: string;
  logoUrl: string;
  faviconUrl: string;
  phone: string;
  email: string;
  businessHours: string;
  serviceAreas: string[];
  instagramUrl: string;
  facebookUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroDescription: string;
  heroMediaUrl: string;
  announcementBar: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  googleReviewUrl: string;
  bookingNotice: string;
  footerText: string;
  privacyPolicy: string;
  termsOfService: string;
  maintenanceMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: { type: String, default: BRAND.name },
    tagline: { type: String, default: BRAND.tagline },
    mainHeadline: { type: String, default: BRAND.headline },
    aboutText: { type: String, default: "" },
    logoUrl: { type: String, default: "/logo.jpg" },
    faviconUrl: { type: String, default: "/logo.jpg" },
    phone: { type: String, default: BRAND.phone },
    email: { type: String, default: BRAND.email },
    businessHours: { type: String, default: BRAND.hours },
    serviceAreas: { type: [String], default: SERVICE_AREAS },
    instagramUrl: { type: String, default: "" },
    facebookUrl: { type: String, default: "" },
    heroHeadline: { type: String, default: BRAND.tagline },
    heroSubheadline: { type: String, default: BRAND.headline },
    heroDescription: {
      type: String,
      default:
        "We bring spotless water, power, professional equipment, and premium detailing products directly to your home, workplace, or preferred location.",
    },
    heroMediaUrl: { type: String, default: "" },
    announcementBar: { type: String, default: "" },
    defaultSeoTitle: {
      type: String,
      default: `${BRAND.name} | ${BRAND.tagline}`,
    },
    defaultSeoDescription: {
      type: String,
      default: BRAND.headline,
    },
    googleReviewUrl: { type: String, default: "" },
    bookingNotice:
      {
        type: String,
        default:
          "Your booking request is pending review until we confirm your appointment.",
      },
    footerText: { type: String, default: "" },
    privacyPolicy: { type: String, default: "" },
    termsOfService: { type: String, default: "" },
    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const SiteSettings =
  models.SiteSettings ||
  model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
