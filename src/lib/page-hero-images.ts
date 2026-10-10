import { CLIENT_IMAGES } from "@/lib/client-images";
import { getServiceAreaBySlug } from "@/lib/service-areas";
import { SERVICE_SLUG_IMAGES, SITE_IMAGES } from "@/lib/site-images";

/** Strong finished exterior — main /services listing hero */
export const SERVICES_INDEX_HERO =
  "/images/client/vernon-2026/paint-correction-charger-finished-exterior.jpg";

const PAGE_HERO_IMAGES: Record<string, string> = {
  "/about": "/images/client/about-escalade.jpg",
  "/services": SERVICES_INDEX_HERO,
  "/pricing": SITE_IMAGES.suvFullDetail,
  "/booking": CLIENT_IMAGES.bookingHeroOutdoor,
  "/contact": CLIENT_IMAGES.homeHeroPoster,
  "/results": CLIENT_IMAGES.porscheShowcaseBright,
  "/testimonials": SITE_IMAGES.ceramicCoating,
  "/team": CLIENT_IMAGES.teamGroup,
  "/faq": SITE_IMAGES.engineBay,
  "/blog": SITE_IMAGES.paintCorrection,
  "/privacy-policy": SITE_IMAGES.hero,
  "/terms": SITE_IMAGES.hero,
};

const PAGE_HERO_EYEBROWS: Record<string, string> = {
  "/about": "Our story",
  "/services": "What we offer",
  "/pricing": "Packages & estimates",
  "/booking": "Schedule your detail",
  "/contact": "Get in touch",
  "/results": "Real transformations",
  "/testimonials": "Client reviews",
  "/team": "Meet the crew",
  "/faq": "Answers & policies",
  "/blog": "Tips & insights",
  "/privacy-policy": "Legal",
  "/terms": "Legal",
};

export function resolvePageHeroImage(pathname: string, override?: string) {
  if (override) return override;
  if (pathname.startsWith("/areas/")) {
    const slug = pathname.split("/")[2];
    if (slug) {
      const area = getServiceAreaBySlug(slug);
      if (area?.heroImage) return area.heroImage;
    }
  }
  if (PAGE_HERO_IMAGES[pathname]) return PAGE_HERO_IMAGES[pathname];
  if (pathname.startsWith("/services/")) {
    const slug = pathname.split("/")[2];
    if (slug) {
      return SERVICE_SLUG_IMAGES[slug] ?? SITE_IMAGES.mobileSunsetSedan;
    }
  }
  if (pathname.startsWith("/blog/")) {
    return SITE_IMAGES.ceramicCoating;
  }
  return SITE_IMAGES.hero;
}

export function resolvePageHeroEyebrow(pathname: string, override?: string) {
  if (override) return override;
  if (PAGE_HERO_EYEBROWS[pathname]) return PAGE_HERO_EYEBROWS[pathname];
  if (pathname.startsWith("/services/")) return "Service detail";
  if (pathname.startsWith("/blog/")) return "Article";
  return "Thompson's Mobile Detailing AZ";
}
