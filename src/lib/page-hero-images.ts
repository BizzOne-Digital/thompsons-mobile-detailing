import { SERVICE_SLUG_IMAGES, SITE_IMAGES } from "@/lib/site-images";

const PAGE_HERO_IMAGES: Record<string, string> = {
  "/about": SITE_IMAGES.mobileVanSetup,
  "/services": SITE_IMAGES.foamWashArizona,
  "/pricing": SITE_IMAGES.suvFullDetail,
  "/booking": SITE_IMAGES.mobileSunsetSedan,
  "/contact": SITE_IMAGES.mobileVanSetup,
  "/results": SITE_IMAGES.headlightRestoration,
  "/testimonials": SITE_IMAGES.ceramicCoating,
  "/team": SITE_IMAGES.interiorExtraction,
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
