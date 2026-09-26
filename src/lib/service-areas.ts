import { BRAND } from "@/lib/constants";
import { CLIENT_IMAGES } from "@/lib/client-images";
import { SITE_IMAGES } from "@/lib/site-images";

export type ServiceAreaPage = {
  slug: string;
  name: string;
  state: string;
  headline: string;
  description: string;
  /** Unique marketing hero for each city page */
  heroImage: string;
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
  return {
    slug,
    name,
    state: "AZ",
    headline: `Mobile Auto Detailing in ${name}, AZ`,
    description: `Professional mobile auto detailing in ${name}, Arizona — ${BRAND.name} brings factory-fresh results to your driveway, office, or garage. Book Refresh, Restore, Reset packages and add-ons online.`,
    heroImage: CITY_HERO_IMAGES[heroIndex % CITY_HERO_IMAGES.length],
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
  page("Glendale", "glendale", 6),
  page("Tolleson", "tolleson", 7),
  page("Phoenix", "phoenix", 8),
  page("North Phoenix", "north-phoenix", 9),
  page("Cave Creek", "cave-creek", 10),
  page("Anthem", "anthem", 11),
  page("New River", "new-river", 12),
  page("Paradise Valley", "paradise-valley", 13),
  page("Scottsdale", "scottsdale", 14),
  page("Fountain Hills", "fountain-hills", 15),
  page("Gilbert", "gilbert", 16),
  page("Chandler", "chandler", 17),
  page("Queen Creek", "queen-creek", 18),
  page("San Tan Valley", "san-tan-valley", 19),
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
