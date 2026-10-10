/** Real client photography — files in /public/images/client/ */
const base = "/images/client";

const v = (name: string) => `${base}/${name}`;
const batch = (name: string) => `${base}/vernon-batch-2025/${name}`;
const march2026 = (name: string) => `${base}/vernon-2026/${name}`;

export const CLIENT_IMAGES = {
  baInteriorBefore: `${base}/ba-02-interior-before.jpg`,
  baInteriorAfter: `${base}/ba-01-interior-after.jpg`,
  baHeadlightBefore: `${base}/ba-03-headlight-before.jpg`,
  baHeadlightAfter: `${base}/ba-04-headlight-after.jpg`,
  baTaillightBefore: v("vernon-06-taillight-before.jpg"),
  baTaillightAfter: v("vernon-07-taillight-after.jpg"),
  baExteriorShowcase: v("vernon-18-escalade-angle.jpg"),
  interior06: v("vernon-01-lexus-white-dash.jpg"),
  interior07: v("vernon-04-lexus-interior.jpg"),
  interior08: v("vernon-05-lexus-fsport.jpg"),
  interior09: v("vernon-02-lexus-fsport-driver.jpg"),
  interior10: v("vernon-03-lexus-rear-white-seats.jpg"),
  engineBefore: march2026("engine-bay-hemi-before.jpg"),
  engineAfter: march2026("engine-bay-hemi-after.jpg"),
  engineShowcase: march2026("engine-bay-hemi-showcase.jpg"),
  homeMobileVan: `${base}/home-mobile-van.jpg`,
  deepClean15: v("vernon-11-porsche-tan-cabin.jpg"),
  deepClean16: v("vernon-14-porsche-garage-front.jpg"),
  deepClean17: v("vernon-15-porsche-garage-angle.jpg"),
  aboutEscalade: v("vernon-18-escalade-angle.jpg"),
  ownerPortrait: `${base}/owner.jpg`,
  teamGroup: `${base}/team-group.jpg`,
  /** Home hero poster (videos8 Escalade showcase) */
  homeHeroPoster: v("vernon-19-escalade-front.jpg"),
  /** Link previews (iMessage, texts, social) — branded van, not client vehicles */
  siteLinkShareImage: v("og-share.jpg"),
  /** Electric blue Charger — portfolio gallery only */
  heroElectricBlueCharger: v("hero-electric-blue-charger.jpg"),
  porscheTanInteriorBright: v("porsche-tan-interior-bright.jpg"),
  /** Garage shot — do not use for link previews or home hero */
  porscheShowcaseBright: v("porsche-showcase-bright.jpg"),
  porscheOutdoorFront: v("vernon-13-porsche-front-outdoor.jpg"),
  interiorWhiteLexusDashboard: v("vernon-01-lexus-white-dash.jpg"),
  interiorWhiteLexusFsport: v("vernon-02-lexus-fsport-driver.jpg"),
  redLeatherBefore: v("red-leather-before.jpg"),
  redLeatherAfter: v("red-leather-after.jpg"),
  paintBefore: march2026("paint-correction-red-oxidized-before.jpg"),
  paintAfter: march2026("paint-correction-charger-finished-exterior.jpg"),
  paintHoodBefore: march2026("paint-correction-hood-oxidized-before.jpg"),
  paintHoodAfter: march2026("paint-correction-hood-finished.jpg"),
  paintProcessFoam: march2026("paint-correction-foam-process.jpg"),
  paintProcessTrim: march2026("paint-correction-trim-process.jpg"),
  paintGlossDetail: march2026("paint-correction-red-gloss-after.jpg"),
  aboutMobileSetup:
    "/images/portfolio/ford-fusion-mobile-process/01-equipment.jpg",
  aboutFoamWash: "/images/portfolio/classic-car-foam-wash/01-foam.jpg",
  /** Homepage package cards — interior-focused finished results (Mar 2026) */
  packageRefreshInterior: march2026("package-refresh-white-suv-interior.jpg"),
  packageRestoreInterior: march2026("package-restore-red-charger-interior.jpg"),
  packageResetInterior: march2026("package-reset-bmw-interior.jpg"),
  /** Outdoor finished exterior — booking & marketing heroes */
  bookingHeroOutdoor: march2026("paint-correction-charger-finished-exterior.jpg"),
  resetDetailHeroExterior: march2026("bmw-x7-exterior-gloss.jpg"),
  /** White vehicle outdoor finish (Restore detail hero) */
  restoreDetailHeroExterior: v("vernon-19-escalade-front.jpg"),
} as const;

export const CLIENT_WHITE_INTERIOR_GALLERY = [
  {
    src: CLIENT_IMAGES.interiorWhiteLexusDashboard,
    alt: "Clean white and black Lexus interior after detailing",
    label: "White Interior Detail",
  },
  {
    src: CLIENT_IMAGES.interiorWhiteLexusFsport,
    alt: "Lexus F Sport cabin restored to showroom condition",
    label: "F Sport Interior",
  },
  {
    src: v("vernon-03-lexus-rear-white-seats.jpg"),
    alt: "Rear cabin white leather after deep clean",
    label: "Rear Seat Reset",
  },
  {
    src: batch("interior-genesis-cabin-wide-after.jpg"),
    alt: "Genesis cabin restored after deep interior detail",
    label: "Genesis Cabin",
  },
  {
    src: batch("interior-chevrolet-captain-rear-after.jpg"),
    alt: "Chevrolet SUV captain chairs after interior reset",
    label: "Captain Chairs",
  },
] as const;

export const CLIENT_PORSCHE_GALLERY = [
  { src: v("vernon-13-porsche-front-outdoor.jpg"), alt: "Porsche Cayenne outdoor detail finish" },
  { src: v("vernon-08-porsche-front.jpg"), alt: "Porsche Cayenne mobile detail" },
  { src: v("vernon-09-porsche-side.jpg"), alt: "Porsche exterior gloss finish" },
  { src: v("vernon-10-porsche-rear.jpg"), alt: "Porsche rear detail and trim" },
  { src: v("vernon-17-porsche-hood-gloss.jpg"), alt: "Paint refinement on Porsche hood" },
] as const;

export const CLIENT_ESCALADE_GALLERY = [
  { src: v("vernon-18-escalade-angle.jpg"), alt: "White Escalade after full detail" },
  { src: v("vernon-19-escalade-front.jpg"), alt: "Escalade front-end finish" },
] as const;

/** Home / contact spotlight — high-impact client stills */
export const CLIENT_SPOTLIGHT_GALLERY = [
  {
    src: v("vernon-13-porsche-front-outdoor.jpg"),
    alt: "Porsche Cayenne exterior gloss after mobile detail",
    label: "Exterior gloss",
  },
  {
    src: v("vernon-19-escalade-front.jpg"),
    alt: "White Cadillac Escalade after full detail",
    label: "Luxury SUV finish",
  },
  {
    src: `${base}/ceramic-coating-finish-alt.jpg`,
    alt: "Ceramic-coated paint with deep gloss and water beading",
    label: "Ceramic protection",
  },
] as const;

export const CLIENT_BEFORE_AFTER_PAIRS = [
  {
    title: "Headlight Restoration",
    category: "Exterior",
    beforeSrc: CLIENT_IMAGES.baHeadlightBefore,
    afterSrc: CLIENT_IMAGES.baHeadlightAfter,
    beforeAlt: "Oxidized headlight lens before restoration",
    afterAlt: "Clear headlight lens after polish and restoration",
  },
  {
    title: "Tail Light Restoration",
    category: "Exterior",
    beforeSrc: CLIENT_IMAGES.baTaillightBefore,
    afterSrc: CLIENT_IMAGES.baTaillightAfter,
    beforeAlt: "Cloudy taillight lens before restoration",
    afterAlt: "Clear taillight after polish and restoration",
  },
  {
    title: "Paint Correction",
    category: "Paint Correction",
    beforeSrc: CLIENT_IMAGES.paintBefore,
    afterSrc: CLIENT_IMAGES.paintAfter,
    beforeAlt: "Faded, oxidized red paint before correction",
    afterAlt: "Deep gloss red finish after paint correction",
  },
  {
    title: "Red Leather & Pet Hair Reset",
    category: "Leather & Seats",
    beforeSrc: CLIENT_IMAGES.redLeatherBefore,
    afterSrc: CLIENT_IMAGES.redLeatherAfter,
    beforeAlt:
      "Red leather rear seats and carpet with pet hair before interior detail",
    afterAlt:
      "Clean red leather rear seats and carpet after pet hair removal",
  },
  {
    title: "Engine Bay Cleaning",
    category: "Engine Bay",
    beforeSrc: CLIENT_IMAGES.engineBefore,
    afterSrc: CLIENT_IMAGES.engineAfter,
    beforeAlt: "Engine bay before degreasing and detail",
    afterAlt: "Clean detailed engine bay after service",
  },
] as const;

/** Strongest transformations for the homepage (full gallery lives on /results). */
export const HOME_FEATURED_BEFORE_AFTER = [
  CLIENT_BEFORE_AFTER_PAIRS[2],
  CLIENT_BEFORE_AFTER_PAIRS[3],
  CLIENT_BEFORE_AFTER_PAIRS[0],
] as const;

export const CLIENT_INTERIOR_GALLERY = [...CLIENT_WHITE_INTERIOR_GALLERY] as const;

export const CLIENT_ENGINE_GALLERY = [
  { src: CLIENT_IMAGES.engineBefore, alt: "Engine bay before cleaning" },
  { src: CLIENT_IMAGES.engineAfter, alt: "Engine bay after professional cleaning" },
  { src: CLIENT_IMAGES.engineShowcase, alt: "Detailed engine bay on pickup truck" },
] as const;

export const CLIENT_DEEP_CLEAN_GALLERY = [
  { src: CLIENT_IMAGES.deepClean15, alt: "Porsche tan interior after deep clean" },
  { src: CLIENT_IMAGES.deepClean16, alt: "Porsche detail in garage" },
  { src: CLIENT_IMAGES.deepClean17, alt: "Full Porsche cabin service" },
] as const;

export const MOBILE_VAN_SERVICES = [
  "Interior Detailing",
  "Exterior Detailing",
  "Paint Protection",
  "Ceramic Coating",
  "Mobile Service",
] as const;
