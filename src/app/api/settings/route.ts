import { getSiteSettings } from "@/lib/settings";
import { BRAND, SERVICE_AREAS } from "@/lib/constants";

export async function GET() {
  const settings = await getSiteSettings();
  if (!settings) {
    return Response.json({
      businessName: BRAND.name,
      tagline: BRAND.tagline,
      mainHeadline: BRAND.headline,
      phone: BRAND.phone,
      email: BRAND.email,
      businessHours: BRAND.hours,
      serviceAreas: SERVICE_AREAS,
      logoUrl: "/logo.jpg",
      maintenanceMode: false,
    });
  }
  return Response.json(settings);
}
