/** Client-provided footage in /public/videos/ */
const base = "/videos";
const engineBase = "/videos2";
const ceramicBase = "/videos3";
const signatureBase = "/videos4";
const aboutShowcaseBase = "/videos5";
const heroVideoBase = "/videos6";

/** Client clips in /public/videos5/ — used on About page */
export const ABOUT_PAGE_VIDEOS = [
  {
    src: `${aboutShowcaseBase}/AQMq5diBc9zT94BqOPAxyf9eib8IvIph8fBepmwepTwypkX7iHfGRRGvpE6Ja0-e_hoDxe7ncwsPeP5sCTsdKXDMsCPrmSKsdNcenkFPyg.mp4`,
    label: "Thompson's mobile detailing — on-site service",
  },
  {
    src: `${aboutShowcaseBase}/AQORYjwFXplj4IquNG_xPHPi_jMg3knsAD2t1n72vAfBkPazCp1AhmAiUx9Wr4iig9xlgV7SGs8MhpS4YQlk3tdI2Jo_cyoJFYiuuNLihw.mp4`,
    label: "Professional detailing process and finish",
  },
  {
    src: `${aboutShowcaseBase}/AQOTCmzlhW0X9NrTT2AVcRB-hL_qNfoVf5VYn3Oyh-YnP2KfR-fCwHCJ8-UH6gauYXxqpWWJZl7OLsgvyH1UtbbsgIvks9oBDoptFiMEXA.mp4`,
    label: "Factory-fresh results at your location",
  },
] as const;

export const CLIENT_VIDEOS = {
  /** Home hero — electric blue Dodge Charger */
  heroElectricBlueCharger: `${heroVideoBase}/hero-electric-blue-charger.mp4`,
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
  "refresh-detail": {
    src: CLIENT_VIDEOS.clip4080,
    poster: "/images/client/vernon-19-escalade-front.jpg",
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
