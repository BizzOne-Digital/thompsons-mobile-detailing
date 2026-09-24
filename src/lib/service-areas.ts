import { BRAND } from "@/lib/constants";

export type ServiceAreaPage = {
  slug: string;
  name: string;
  state: string;
  headline: string;
  description: string;
};

function page(name: string, slugBase: string): ServiceAreaPage {
  const slug = `${slugBase}-az`;
  return {
    slug,
    name,
    state: "AZ",
    headline: `Mobile Auto Detailing in ${name}, AZ`,
    description: `Professional mobile auto detailing in ${name}, Arizona — ${BRAND.name} brings factory-fresh results to your driveway, office, or garage. Book Refresh, Restore, Reset packages and add-ons online.`,
  };
}

export const SERVICE_AREA_PAGES: ServiceAreaPage[] = [
  page("Avondale", "avondale"),
  page("Buckeye", "buckeye"),
  page("Goodyear", "goodyear"),
  page("Litchfield Park", "litchfield-park"),
  page("Surprise", "surprise"),
  page("Phoenix", "phoenix"),
  page("Scottsdale", "scottsdale"),
  page("Glendale", "glendale"),
  page("Peoria", "peoria"),
  page("San Tan Valley", "san-tan-valley"),
  page("Gilbert", "gilbert"),
  page("Mesa", "mesa"),
  page("Chandler", "chandler"),
];

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
