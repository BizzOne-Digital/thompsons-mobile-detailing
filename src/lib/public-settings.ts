import { BRAND, SERVICE_AREAS } from "@/lib/constants";
import type { ISiteSettings } from "@/models/SiteSettings";

export type PublicSiteSettings = {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  businessHours: string;
  logoUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroDescription: string;
  heroMediaUrl: string;
  ownerPhotoUrl: string;
  teamGroupPhotoUrl: string;
  aboutText: string;
  footerText: string;
  instagramUrl: string;
  facebookUrl: string;
  announcementBar: string;
  bookingNotice: string;
  serviceAreas: string[];
};

export function toPublicSiteSettings(
  raw: Partial<ISiteSettings> | null | undefined
): PublicSiteSettings {
  return {
    businessName: raw?.businessName || BRAND.name,
    tagline: raw?.tagline || BRAND.tagline,
    phone: raw?.phone || BRAND.phone,
    email: raw?.email || BRAND.email,
    businessHours: raw?.businessHours || BRAND.hours,
    logoUrl: raw?.logoUrl || "/logo.jpg",
    heroHeadline: raw?.heroHeadline || "Factory Fresh",
    heroSubheadline: raw?.heroSubheadline || "Results Guaranteed",
    heroDescription:
      raw?.heroDescription ||
      "Professional mobile auto detailing in Avondale and across the Phoenix metro—delivered to your home, office, or preferred location.",
    heroMediaUrl: raw?.heroMediaUrl || "",
    ownerPhotoUrl: raw?.ownerPhotoUrl || "",
    teamGroupPhotoUrl: raw?.teamGroupPhotoUrl || "",
    aboutText: raw?.aboutText || "",
    footerText: raw?.footerText || "",
    instagramUrl: raw?.instagramUrl || "",
    facebookUrl: raw?.facebookUrl || "",
    announcementBar: raw?.announcementBar || "",
    bookingNotice:
      raw?.bookingNotice ||
      "Your booking request is pending review until we confirm your appointment.",
    serviceAreas:
      raw?.serviceAreas?.length ? raw.serviceAreas : [...SERVICE_AREAS],
  };
}

export function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits ? `tel:+${digits.startsWith("1") ? digits : `1${digits}`}` : BRAND.phoneHref;
}
