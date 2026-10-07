import type { AreaPageCopy } from "@/lib/area-page-copy";
import { fallbackAreaCopy, getAreaPageCopy } from "@/lib/area-page-copy";
import {
  CITY_HERO_BY_SLUG,
  DEFAULT_CITY_HERO,
} from "@/lib/city-hero-images";

export type ServiceAreaPage = {
  slug: string;
  name: string;
  state: string;
  headline: string;
  description: string;
  heroImage: string;
  copy: AreaPageCopy;
};

function page(name: string, slugBase: string): ServiceAreaPage {
  const slug = `${slugBase}-az`;
  const copy = getAreaPageCopy(slug) ?? fallbackAreaCopy(name, slug);
  return {
    slug,
    name,
    state: "AZ",
    headline: copy.h1,
    description: copy.heroSubtitle,
    heroImage: CITY_HERO_BY_SLUG[slug] ?? DEFAULT_CITY_HERO,
    copy,
  };
}

/** Client-approved service cities (display order) */
export const SERVICE_AREA_PAGES: ServiceAreaPage[] = [
  page("Avondale", "avondale"),
  page("Litchfield Park", "litchfield-park"),
  page("Goodyear", "goodyear"),
  page("Buckeye", "buckeye"),
  page("Waddell", "waddell"),
  page("Surprise", "surprise"),
  page("Sun City", "sun-city"),
  page("Glendale", "glendale"),
  page("Tolleson", "tolleson"),
  page("Phoenix", "phoenix"),
  page("North Phoenix", "north-phoenix"),
  page("Cave Creek", "cave-creek"),
  page("Anthem", "anthem"),
  page("New River", "new-river"),
  page("Paradise Valley", "paradise-valley"),
  page("Scottsdale", "scottsdale"),
  page("Fountain Hills", "fountain-hills"),
  page("Gilbert", "gilbert"),
  page("Chandler", "chandler"),
  page("Queen Creek", "queen-creek"),
  page("San Tan Valley", "san-tan-valley"),
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
