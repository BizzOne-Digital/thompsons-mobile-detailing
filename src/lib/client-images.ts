/** Real client photography — files in /public/images/client/ */
const base = "/images/client";

const v = (name: string) => `${base}/${name}`;
const batch = (name: string) => `${base}/vernon-batch-2025/${name}`;
const march2026 = (name: string) => `${base}/vernon-2026/${name}`;

export const CLIENT_IMAGES = {
  baInteriorBefore: `${base}/ba-02-interior-before.jpg`,
  baInteriorAfter: `${base}/ba-01-interior-after.jpg`,
  baHeadlightBefore: march2026("charger-headlight-before.jpg"),
  baHeadlightAfter: march2026("charger-headlight-after.jpg"),
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
  /** Home hero poster (videos10 Dodge rinse clip) */
  homeHeroPoster: "/images/portfolio/gray-dodge-challenger/01-front.jpg",
  /** Link previews (iMessage, texts, social) — branded van, not client vehicles */
  siteLinkShareImage: v("og-share.jpg"),
  /** Electric blue Charger — portfolio gallery only */
  heroElectricBlueCharger: v("hero-electric-blue-charger.jpg"),
  porscheTanInteriorBright: v("porsche-tan-interior-bright.jpg"),
  /** Garage shot — do not use for link previews or home hero */
  porscheShowcaseBright: v("porsche-showcase-bright.jpg"),
  /** White Porsche Cayenne — Signature Foam hero & cards */
  porscheOutdoorFront: march2026("signature-white-porsche-exterior-hero.jpg"),
  porscheWhiteExteriorAngle: march2026("signature-white-porsche-exterior-angle.jpg"),
  /** Black Porsche Cayenne — oxidized before / gloss after (B&A only) */
  blackPorscheOxidizedBefore: v("vernon-10-porsche-rear.jpg"),
  blackPorscheGlossAfter: v("vernon-08-porsche-front.jpg"),
  blackPorscheGarageFront: v("vernon-14-porsche-garage-front.jpg"),
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
  /** Package cards & detail heroes — one vehicle per package (Mar 2026) */
  packageRefreshInterior: march2026("refresh-tundra-driver-cabin.jpg"),
  packageRestoreInterior: march2026("restore-charger-driver-interior.jpg"),
  packageResetInterior: march2026("signature-porsche-extra-01.jpg"),
  resetEscaladeExteriorFront: march2026("signature-porsche-extra-05.jpg"),
  resetEscaladeExteriorSide: march2026("signature-porsche-extra-06.jpg"),
  refreshTundraRearInterior: march2026("refresh-tundra-rear-interior.jpg"),
  refreshTundraConsole: march2026("refresh-tundra-console.jpg"),
  refreshTundraPassengerSeat: march2026("refresh-tundra-passenger-seat.jpg"),
  refreshTundraDriverDoor: march2026("refresh-tundra-driver-door.jpg"),
  refreshTundraExteriorFront: march2026("refresh-tundra-exterior-front.jpg"),
  refreshTundraExteriorAngle: march2026(
    "refresh-tundra-exterior-front-angle.jpg"
  ),
  restoreChargerDaytonaDash: march2026("restore-charger-daytona-dash.jpg"),
  restoreChargerRearSeats: march2026("restore-charger-rear-seats.jpg"),
  restoreChargerDashboard: march2026("restore-charger-dashboard.jpg"),
  restoreChargerCenterConsole: march2026("restore-charger-center-console.jpg"),
  restoreChargerRearCabin: march2026("restore-charger-rear-cabin.jpg"),
  resetChargerExteriorRear: march2026("reset-charger-exterior-rear.jpg"),
  resetChargerExteriorDriveway: march2026("reset-charger-exterior-driveway.jpg"),
  resetChargerEngineBay: march2026("reset-charger-engine-bay.jpg"),
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

/** Signature Foam — white Porsche stills (video in videos9) */
export const SIGNATURE_FOAM_WHITE_PORSCHE_STILLS = [
  {
    src: CLIENT_IMAGES.porscheOutdoorFront,
    alt: "White Porsche Cayenne after Signature Foam hand wash and clay bar",
    caption: "White Porsche — outdoor gloss finish",
  },
  {
    src: CLIENT_IMAGES.porscheWhiteExteriorAngle,
    alt: "White Porsche Cayenne exterior after foam, clay bar, and sealant",
    caption: "White Porsche — protected shine",
  },
] as const;

/** Black Porsche Cayenne — lower in Signature Foam gallery (not hero) */
export const SIGNATURE_FOAM_BLACK_PORSCHE_STILLS = [
  {
    src: CLIENT_IMAGES.blackPorscheGarageFront,
    alt: "Black Porsche Cayenne hand wash inside residential garage",
    caption: "Black Porsche Cayenne — foam & hand wash",
  },
] as const;

/** Cadillac Escalade exteriors — Signature Foam (interiors live on Reset Detail) */
export const SIGNATURE_FOAM_ESCALADE_EXTERIOR_STILLS = [
  {
    src: v("vernon-17-porsche-hood-gloss.jpg"),
    alt: "White Cadillac Escalade front finish after mobile detail",
    caption: "White Cadillac Escalade — outdoor gloss",
  },
  {
    src: v("vernon-19-escalade-front.jpg"),
    alt: "White Cadillac Escalade front after Signature Foam service",
    caption: "White Cadillac Escalade — protected finish",
  },
  {
    src: CLIENT_IMAGES.resetEscaladeExteriorFront,
    alt: "Black Cadillac Escalade front after mobile detail",
    caption: "Black Cadillac Escalade — front finish",
  },
  {
    src: CLIENT_IMAGES.resetEscaladeExteriorSide,
    alt: "Black Cadillac Escalade side profile after detail",
    caption: "Black Cadillac Escalade — side profile",
  },
] as const;

/** Black Cadillac Escalade — Reset Detail (interior restoration + cargo) */
export const RESET_ESCALADE_INTERIOR_STILLS = [
  {
    src: march2026("signature-porsche-extra-02.jpg"),
    alt: "Black Cadillac Escalade white leather rear seats after Reset Detail",
    caption: "Black Escalade — white leather rear cabin",
  },
  {
    src: march2026("signature-porsche-extra-01.jpg"),
    alt: "Black Cadillac Escalade white leather front interior after Reset Detail",
    caption: "Black Escalade — white leather interior",
  },
  {
    src: march2026("signature-porsche-extra-03.jpg"),
    alt: "Black Cadillac Escalade driver cabin with white leather after Reset Detail",
    caption: "Black Escalade — driver cabin",
  },
  {
    src: march2026("signature-porsche-extra-04.jpg"),
    alt: "Black Cadillac Escalade cargo area after Reset Detail",
    caption: "Black Escalade — cargo area",
  },
] as const;

/** @deprecated Use SIGNATURE_FOAM_ESCALADE_EXTERIOR_STILLS */
export const SIGNATURE_FOAM_ESCALADE_STILLS = SIGNATURE_FOAM_ESCALADE_EXTERIOR_STILLS;

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
    beforeAlt: "Red Dodge Charger headlight before restoration",
    afterAlt: "Red Dodge Charger headlight after restoration",
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
    category: "Exterior",
    beforeSrc: CLIENT_IMAGES.paintBefore,
    afterSrc: CLIENT_IMAGES.paintAfter,
    beforeAlt: "Faded, oxidized red paint before correction",
    afterAlt: "Deep gloss red finish after paint correction",
  },
  {
    title: "Leather Cleaning & Pet Hair Removal",
    category: "Interior",
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
  {
    title: "Black Porsche Cayenne — Exterior Refinement",
    category: "Exterior",
    beforeSrc: CLIENT_IMAGES.blackPorscheOxidizedBefore,
    afterSrc: CLIENT_IMAGES.blackPorscheGlossAfter,
    beforeAlt: "Black Porsche Cayenne with oxidized headlights and dull paint before detail",
    afterAlt: "Black Porsche Cayenne with deep gloss finish after Signature Foam and refinement",
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
