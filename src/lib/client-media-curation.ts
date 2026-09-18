/**
 * Vernon: “You don’t have to add everything — use judgment until new footage.”
 * Edit these lists when promoting more portfolio folders or videos7 clips live.
 */

/** Exterior portfolio projects shown on /results (full library stays on disk) */
export const FEATURED_PORTFOLIO_PROJECT_IDS = [
  "electric-blue-charger",
  "cadillac-escalade",
  "porsche-cayenne",
  "chevrolet-truck",
  "toyota-tundra-trd",
  "chevy-tahoe-setina",
  "gmc-sierra-at4-white",
  "ford-edge",
  "porsche-911-cabriolet",
  "tesla-model-y-red",
  "lime-green-toyota-4runner",
  "blue-honda-civic",
  "silver-mercedes-e-class",
  "black-bmw-x5",
] as const;

/** Max stills in the results photo grid (from featured portfolio) */
export const RESULTS_GALLERY_PHOTO_COUNT = 8;

/** videos7 roles surfaced on /results (hero, about, home use others) */
export const FEATURED_RESULTS_VIDEO_KEYS = [
  "signatureFoamWash",
  "clip4080",
  "engineBayCleaning",
  "ceramicProtection",
] as const;

/** Extra clips from public/videos/videos (see generate-videos-library-manifest.mjs) */
export const INCLUDE_LIBRARY_VIDEOS_ON_RESULTS = true;
