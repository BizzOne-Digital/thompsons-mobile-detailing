import { CLIENT_IMAGES } from "@/lib/client-images";
import { VIDEOS8_RECURRING_MAINTENANCE } from "@/lib/client-videos8";
import { VIDEOS9_SIGNATURE_FOAM_WASH } from "@/lib/client-videos9";
import { VIDEOS10_PACKAGE_REFRESH } from "@/lib/client-videos10";
import { VIDEOS11_PACKAGE_RESTORE } from "@/lib/client-videos11";
import { VIDEOS12_PACKAGE_RESET } from "@/lib/client-videos12";

/** At most one autoplay hero video per service page (performance). */
export const SERVICE_HERO_VIDEO: Partial<Record<string, string>> = {
  "recurring-maintenance-wash": VIDEOS8_RECURRING_MAINTENANCE,
};

/** Poster when a service uses video only in the process section (not the page hero). */
export const SERVICE_HERO_IMAGE: Partial<Record<string, string>> = {
  "signature-foam-hand-wash": CLIENT_IMAGES.porscheOutdoorFront,
};

export const SERVICE_PROCESS_FEATURED_VIDEO: Partial<
  Record<string, { src: string; poster: string; alt: string }>
> = {
  "refresh-detail": {
    src: VIDEOS10_PACKAGE_REFRESH,
    poster: CLIENT_IMAGES.packageRefreshInterior,
    alt: "Refresh Detail on a blue Toyota Tundra — maintenance wash and interior care",
  },
  "restore-detail": {
    src: VIDEOS11_PACKAGE_RESTORE,
    poster: CLIENT_IMAGES.packageRestoreInterior,
    alt: "Restore Detail on a red Dodge Charger — deep interior restoration",
  },
  "reset-detail": {
    src: VIDEOS12_PACKAGE_RESET,
    poster: CLIENT_IMAGES.resetChargerEngineBay,
    alt: "Reset Detail on a red Dodge Charger — maximum interior restoration",
  },
  "signature-foam-hand-wash": {
    src: VIDEOS9_SIGNATURE_FOAM_WASH,
    poster: CLIENT_IMAGES.porscheOutdoorFront,
    alt: "Signature foam hand wash on a white Porsche Cayenne",
  },
};
