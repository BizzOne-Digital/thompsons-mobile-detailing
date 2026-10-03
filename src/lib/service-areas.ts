import { CLIENT_IMAGES } from "@/lib/client-images";
import { SITE_IMAGES } from "@/lib/site-images";
import type { AreaPageCopy } from "@/lib/area-page-copy";
import { fallbackAreaCopy, getAreaPageCopy } from "@/lib/area-page-copy";

export type ServiceAreaPage = {
  slug: string;
  name: string;
  state: string;
  headline: string;
  description: string;
  heroImage: string;
  copy: AreaPageCopy;
};

/** Diverse client photography — avoid repeating the gray Charger rinse on every city page */
const CITY_HERO_IMAGES = [
  CLIENT_IMAGES.aboutEscalade,
  CLIENT_IMAGES.porscheOutdoorFront,
  CLIENT_IMAGES.homeMobileVan,
  CLIENT_IMAGES.aboutFoamWash,
  SITE_IMAGES.ceramicCoating,
  SITE_IMAGES.suvFullDetail,
  CLIENT_IMAGES.deepClean16,
  CLIENT_IMAGES.paintAfter,
  CLIENT_IMAGES.redLeatherAfter,
  "/images/client/vernon-batch-2025/exterior-black-camry-after-rear-01.jpg",
  "/images/portfolio/ford-bronco-foam-wash/01-foam.jpg",
  "/images/portfolio/white-ford-f150/01-side.jpg",
  "/images/portfolio/blue-honda-accord/03-front.jpg",
  "/images/client/vernon-batch-2025/interior-genesis-cabin-wide-after.jpg",
  CLIENT_IMAGES.porscheTanInteriorBright,
  CLIENT_IMAGES.engineShowcase,
  SITE_IMAGES.mobileSunsetSedan,
  "/images/portfolio/black-bmw-x5/01-front.jpg",
  "/images/portfolio/tesla-model-y-red/02-front.jpg",
  "/images/portfolio/classic-car-foam-wash/01-foam.jpg",
] as const;

function page(
  name: string,
  slugBase: string,
  heroIndex: number
): ServiceAreaPage {
  const slug = `${slugBase}-az`;
  const copy = getAreaPageCopy(slug) ?? fallbackAreaCopy(name, slug);
  return {
    slug,
    name,
    state: "AZ",
    headline: copy.h1,
    description: copy.heroSubtitle,
    heroImage: CITY_HERO_IMAGES[heroIndex % CITY_HERO_IMAGES.length],
    copy,
  };
}

/** Client-approved service cities (display order) */
export const SERVICE_AREA_PAGES: ServiceAreaPage[] = [
  page("Avondale", "avondale", 0),
  page("Litchfield Park", "litchfield-park", 1),
  page("Goodyear", "goodyear", 2),
  page("Buckeye", "buckeye", 3),
  page("Waddell", "waddell", 4),
  page("Surprise", "surprise", 5),
  page("Sun City", "sun-city", 6),
  page("Glendale", "glendale", 7),
  page("Tolleson", "tolleson", 8),
  page("Phoenix", "phoenix", 9),
  page("North Phoenix", "north-phoenix", 10),
  page("Cave Creek", "cave-creek", 11),
  page("Anthem", "anthem", 12),
  page("New River", "new-river", 13),
  page("Paradise Valley", "paradise-valley", 14),
  page("Scottsdale", "scottsdale", 15),
  page("Fountain Hills", "fountain-hills", 16),
  page("Gilbert", "gilbert", 17),
  page("Chandler", "chandler", 18),
  page("Queen Creek", "queen-creek", 19),
  page("San Tan Valley", "san-tan-valley", 20),
];

export const SERVICE_AREA_NAMES = SERVICE_AREA_PAGES.map((a) => a.name);

export function getServiceAreaBySlug(slug: string): ServiceAreaPage | undefined {
  const normalized = slug.toLowerCase().replace(/\/$/, "");
  return SERVICE_AREA_PAGES.find(
    (a) =>
      a.slug === normalized ||
      a.slug === `${normalized}-az` ||
      a.slug.replace(/-az$/, "") === normalized.replace(/-az$/, "")
  );
}

export function serviceAreaPath(slug: string) {
  return `/areas/${slug}`;
}

/** Footer / contact list label → area page slug */
export function slugForAreaName(name: string): string | null {
  const match = SERVICE_AREA_PAGES.find(
    (a) => a.name.toLowerCase() === name.toLowerCase()
  );
  return match?.slug ?? null;
}
