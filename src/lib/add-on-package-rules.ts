/** Full detail packages that support optional paid add-ons in booking. */
export const DETAIL_PACKAGE_SLUGS = [
  "refresh-detail",
  "restore-detail",
  "reset-detail",
] as const;

export type DetailPackageSlug = (typeof DETAIL_PACKAGE_SLUGS)[number];

/** Add-on slugs already included in Restore Detail (do not offer again). */
const RESTORE_INCLUDED_ADDON_SLUGS = [
  "leather-and-carpet-deep-clean",
  "fabric-seat-carpet-shampoo",
  "interior-plastic-trim-restoration",
] as const;

/** Additional add-on slugs included in Reset Detail beyond Restore. */
const RESET_EXTRA_INCLUDED_ADDON_SLUGS = [
  "pet-hair-removal",
  "interior-odor-treatment",
  "exterior-trim-restoration",
] as const;

export function getIncludedAddOnSlugsForPackage(
  packageSlug: string | undefined
): Set<string> {
  const included = new Set<string>();
  if (!packageSlug) return included;

  if (
    packageSlug === "restore-detail" ||
    packageSlug === "reset-detail"
  ) {
    for (const slug of RESTORE_INCLUDED_ADDON_SLUGS) {
      included.add(slug);
    }
  }
  if (packageSlug === "reset-detail") {
    for (const slug of RESET_EXTRA_INCLUDED_ADDON_SLUGS) {
      included.add(slug);
    }
  }
  return included;
}

export type BookableAddOnLike = {
  slug: string;
  serviceSlugs?: string[];
};

/** Whether an add-on should appear in booking for the selected package. */
export function isAddOnBookableForPackage(
  addOn: BookableAddOnLike,
  packageSlug: string | undefined
): boolean {
  if (
    !packageSlug ||
    !DETAIL_PACKAGE_SLUGS.includes(packageSlug as DetailPackageSlug)
  ) {
    return false;
  }

  if (getIncludedAddOnSlugsForPackage(packageSlug).has(addOn.slug)) {
    return false;
  }

  if (addOn.serviceSlugs?.length) {
    return addOn.serviceSlugs.includes(packageSlug);
  }

  return true;
}

export function filterBookableAddOns<T extends BookableAddOnLike>(
  addOns: T[],
  packageSlug: string | undefined
): T[] {
  return addOns.filter((a) => isAddOnBookableForPackage(a, packageSlug));
}
