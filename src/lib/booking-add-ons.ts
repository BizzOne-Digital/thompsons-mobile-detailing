import { DETAIL_PACKAGE_SLUGS } from "@/lib/constants";
import { getExcludedAddOnSlugsForPackage } from "@/lib/package-inclusions";

export function isDetailPackageSlug(slug: string | undefined): boolean {
  if (!slug) return false;
  return (DETAIL_PACKAGE_SLUGS as readonly string[]).includes(slug);
}

/** All active add-ons for marketing / browse views (full catalog). */
export function sortAddOnsByDisplayOrder<T extends { displayOrder?: number }>(
  addOns: T[]
): T[] {
  return [...addOns].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
  );
}

/**
 * Add-ons selectable during package booking — scoped to detail packages and
 * excluding services already included in the chosen package.
 */
export function filterAddOnsForPackageBooking<
  T extends { slug: string; serviceSlugs?: string[] },
>(addOns: T[], serviceSlug: string | undefined): T[] {
  if (!isDetailPackageSlug(serviceSlug)) return [];

  const excluded = new Set(getExcludedAddOnSlugsForPackage(serviceSlug));

  return addOns.filter((a) => {
    if (excluded.has(a.slug)) return false;
    const scoped = a.serviceSlugs?.length;
    if (!scoped) return true;
    return serviceSlug ? a.serviceSlugs!.includes(serviceSlug) : false;
  });
}

/** @deprecated Use filterAddOnsForPackageBooking */
export function filterAddOnsForService<
  T extends { slug: string; serviceSlugs?: string[] },
>(addOns: T[], serviceSlug: string | undefined): T[] {
  return filterAddOnsForPackageBooking(addOns, serviceSlug);
}
