import type { DetailPackageSlug } from "@/lib/constants";

/** Add-on slugs already included in Restore Detail (and Reset, which includes Restore). */
const RESTORE_PACKAGE_INCLUDED_ADDON_SLUGS = [
  "leather-cleaning-conditioning-protection",
  "fabric-seat-shampoo-extraction",
  "carpet-shampoo-extraction",
] as const;

/** Add-on slugs included only in Reset Detail (on top of Restore inclusions). */
const RESET_PACKAGE_EXTRA_INCLUDED_ADDON_SLUGS = [
  "exterior-trim-restoration",
] as const;

export function getExcludedAddOnSlugsForPackage(
  packageSlug: string | undefined
): readonly string[] {
  if (packageSlug === "restore-detail") {
    return RESTORE_PACKAGE_INCLUDED_ADDON_SLUGS;
  }
  if (packageSlug === "reset-detail") {
    return [
      ...RESTORE_PACKAGE_INCLUDED_ADDON_SLUGS,
      ...RESET_PACKAGE_EXTRA_INCLUDED_ADDON_SLUGS,
    ];
  }
  return [];
}

export function isPackageSlug(slug: string): slug is DetailPackageSlug {
  return (
    slug === "refresh-detail" ||
    slug === "restore-detail" ||
    slug === "reset-detail"
  );
}
