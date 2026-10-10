/** Vernon Mar 2026 — /public/videos8/ */

import { CLIENT_IMAGES } from "@/lib/client-images";

const v8 = (file: string) => `/videos8/${file}`;

/** Home page hero — outdoor Escalade / maintenance showcase */
export const VIDEOS8_HOME_HERO = v8(
  "AQMq5diBc9zT94BqOPAxyf9eib8IvIph8fBepmwepTwypkX7iHfGRRGvpE6Ja0-e_hoDxe7ncwsPeP5sCTsdKXDMsCPrmSKsdNcenkFPyg.mp4"
);

/** Recurring Customer Maintenance Wash — service detail hero */
export const VIDEOS8_RECURRING_MAINTENANCE = v8(
  "AQPR2OHXdDCP9nFpvVZftyYtU4nkyqJqLIIXbtxM19mDzVImxInBM0MZCtBpf1bSyYjr2tYmmrr76rzjL66k1v4ZMB9RhNohtcNIlEJqdQ.mp4"
);

/** Homepage package cards — live preview before View Full Details */
export const VIDEOS8_PACKAGE_REFRESH = v8(
  "AQOSEiUH9lEr0eFNegV4bdIC3szLB6hFfA8mvcIXQwV8XEFc-lqvckxNEyuZWwbp47AT63pd11mGBC9NgbsaCRYxd8oKzlGmiay1u4WR7Q.mp4"
);

export const VIDEOS8_PACKAGE_RESTORE = v8(
  "AQOFa96x-G_jMBpZ6OUpGEwR_zFCXfqdkmUngy9As30BllmSm1VSEz0RaLDiFOmOoyo5ZPWB4xBIXbSV1s41MQqd6naV9w043LxM2eLd6Q.mp4"
);

/** Full-detail / maintenance energy — Reset package card (distinct from hero clip) */
export const VIDEOS8_PACKAGE_RESET = VIDEOS8_RECURRING_MAINTENANCE;

export type PackageCardPreview = { src: string; poster: string };

/** Live footage on homepage Refresh / Restore / Reset cards */
export const PACKAGE_CARD_PREVIEW_VIDEOS: Record<string, PackageCardPreview> = {
  "refresh-detail": {
    src: VIDEOS8_PACKAGE_REFRESH,
    poster: CLIENT_IMAGES.packageRefreshInterior,
  },
  "restore-detail": {
    src: VIDEOS8_PACKAGE_RESTORE,
    poster: CLIENT_IMAGES.packageRestoreInterior,
  },
  "reset-detail": {
    src: VIDEOS8_PACKAGE_RESET,
    poster: CLIENT_IMAGES.packageResetInterior,
  },
};
