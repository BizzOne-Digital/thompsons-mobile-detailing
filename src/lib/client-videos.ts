/** Client-provided footage in /public/videos/ */
const base = "/videos";
const engineBase = "/videos2";
const ceramicBase = "/videos3";
const signatureBase = "/videos4";

export const CLIENT_VIDEOS = {
  /** Full-width home section below hero */
  homeLiveFootage: `${base}/IMG_4077.MOV`,
  /** Interior deep clean — service pages & home showcase */
  interiorDeepClean: `${base}/IMG_7914.MOV`,
  /** Engine bay cleaning — service hero & results */
  engineBayCleaning: `${engineBase}/IMG_4162.MOV`,
  /** Ceramic coating — 6s H.264 web clip + finish still */
  ceramicProtection: `${ceramicBase}/ceramic-showcase.mp4`,
  ceramicProtectionPoster: "/images/client/ceramic-coating-finish.jpg",
  /** Signature foam hand wash */
  signatureFoamWash: `${signatureBase}/signature-foam-showcase.mp4`,
  signatureFoamWashPoster: "/images/client/signature-foam-wash.jpg",
  /** Additional clips (swap in admin/content later if needed) */
  clip2862: `${base}/IMG_2862.MOV`,
  clip4080: `${base}/IMG_4080.MOV`,
  clip4344: `${base}/IMG_4344.MOV`,
} as const;

/** Service page heroes — poster is the static fallback image */
export const SERVICE_SLUG_VIDEOS: Partial<
  Record<string, { src: string; poster: string }>
> = {
  "restore-detail": {
    src: CLIENT_VIDEOS.interiorDeepClean,
    poster: "/images/client/deep-clean-16.jpg",
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
};
