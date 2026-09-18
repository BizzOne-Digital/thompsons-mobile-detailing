/**
 * Client video sources — primary library: /public/videos7/
 * Regenerate list: node scripts/generate-videos7-manifest.mjs
 */
import { FEATURED_RESULTS_VIDEO_KEYS } from "@/lib/client-media-curation";
import {
  VIDEOS7_ABOUT,
  VIDEOS7_CERAMIC,
  VIDEOS7_CLIP_C,
  VIDEOS7_CLIP_D,
  VIDEOS7_ENGINE,
  VIDEOS7_EXTERIOR_A,
  VIDEOS7_EXTERIOR_B,
  VIDEOS7_HERO,
  VIDEOS7_HOME_LIVE,
  VIDEOS7_INTERIOR,
  VIDEOS7_SIGNATURE_FOAM,
} from "@/lib/client-videos7.generated";

const clientBase = "/videos7";

/** About page showcase clips (from Vernon videos7 folder) */
export const ABOUT_PAGE_VIDEOS = VIDEOS7_ABOUT.map((clip) => ({
  src: clip.src,
  label: clip.label,
}));

export const CLIENT_VIDEOS = {
  /** Home hero — Vernon videos7 (largest showcase clip) */
  heroElectricBlueCharger: VIDEOS7_HERO,
  /** Full-width home section below hero */
  homeLiveFootage: VIDEOS7_HOME_LIVE,
  /** Interior deep clean — service pages & home showcase */
  interiorDeepClean: VIDEOS7_INTERIOR,
  /** Engine bay cleaning — service hero & results */
  engineBayCleaning: VIDEOS7_ENGINE,
  /** Ceramic coating showcase */
  ceramicProtection: VIDEOS7_CERAMIC,
  ceramicProtectionPoster: "/images/client/ceramic-coating-finish.jpg",
  /** Signature foam hand wash */
  signatureFoamWash: VIDEOS7_SIGNATURE_FOAM,
  signatureFoamWashPoster: "/images/portfolio/classic-car-foam-wash/01-foam.jpg",
  clip4080: VIDEOS7_EXTERIOR_A,
  clip4344: VIDEOS7_EXTERIOR_B,
  clip2862: VIDEOS7_CLIP_C,
  clipExtra: VIDEOS7_CLIP_D,
} as const;

const VIDEO_LABELS: Record<(typeof FEATURED_RESULTS_VIDEO_KEYS)[number], string> = {
  signatureFoamWash: "Signature foam hand wash",
  clip4080: "Exterior mobile detailing",
  engineBayCleaning: "Engine bay cleaning",
  ceramicProtection: "Ceramic protection finish",
};

/** Curated clips for /results (not the full videos7 library) */
export const CLIENT_VIDEO_GALLERY = FEATURED_RESULTS_VIDEO_KEYS.map((key) => ({
  src: CLIENT_VIDEOS[key],
  label: VIDEO_LABELS[key],
}));

/** Service page heroes — poster is the static fallback image */
export const SERVICE_SLUG_VIDEOS: Partial<
  Record<string, { src: string; poster: string }>
> = {
  "restore-detail": {
    src: CLIENT_VIDEOS.interiorDeepClean,
    poster: "/images/client/vernon-11-porsche-tan-cabin.jpg",
  },
  "engine-bay-cleaning": {
    src: CLIENT_VIDEOS.engineBayCleaning,
    poster: "/images/client/engine-12-after.jpg",
  },
  "ceramic-coating": {
    src: CLIENT_VIDEOS.ceramicProtection,
    poster: CLIENT_VIDEOS.ceramicProtectionPoster,
  },
  "signature-foam-hand-wash": {
    src: CLIENT_VIDEOS.signatureFoamWash,
    poster: CLIENT_VIDEOS.signatureFoamWashPoster,
  },
  "refresh-detail": {
    src: CLIENT_VIDEOS.clip4080,
    poster: "/images/portfolio/toyota-tundra-trd/02-front.jpg",
  },
  "reset-detail": {
    src: CLIENT_VIDEOS.clip4344,
    poster: "/images/client/vernon-11-porsche-tan-cabin.jpg",
  },
  "paint-correction": {
    src: CLIENT_VIDEOS.clip2862,
    poster: "/images/client/vernon-16-paint-hood-after.jpg",
  },
};

export { clientBase as CLIENT_VIDEOS_ROOT };
