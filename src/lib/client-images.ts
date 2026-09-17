/** Real client photography — files in /public/images/client/ */
const base = "/images/client";

const v = (name: string) => `${base}/${name}`;

export const CLIENT_IMAGES = {
  baInteriorBefore: `${base}/ba-02-interior-before.jpg`,
  baInteriorAfter: `${base}/ba-01-interior-after.jpg`,
  baHeadlightBefore: v("vernon-06-taillight-before.jpg"),
  baHeadlightAfter: v("vernon-07-taillight-after.jpg"),
  baExteriorShowcase: v("vernon-18-escalade-angle.jpg"),
  interior06: v("vernon-01-lexus-white-dash.jpg"),
  interior07: v("vernon-04-lexus-interior.jpg"),
  interior08: v("vernon-05-lexus-fsport.jpg"),
  interior09: v("vernon-02-lexus-fsport-driver.jpg"),
  interior10: v("vernon-03-lexus-rear-white-seats.jpg"),
  engineBefore: `${base}/engine-11-before.jpg`,
  engineAfter: `${base}/engine-12-after.jpg`,
  engineShowcase: `${base}/engine-13-showcase.jpg`,
  homeMobileVan: `${base}/home-mobile-van.jpg`,
  deepClean15: v("vernon-11-porsche-tan-cabin.jpg"),
  deepClean16: v("vernon-14-porsche-garage-front.jpg"),
  deepClean17: v("vernon-15-porsche-garage-angle.jpg"),
  aboutEscalade: v("vernon-18-escalade-angle.jpg"),
  ownerPortrait: `${base}/owner.jpg`,
  teamGroup: `${base}/team-group.jpg`,
  /** Upload blue Charger in Admin → Settings → Home hero when available */
  heroElectricBlueCharger: v("hero-electric-blue-charger.jpg"),
  porscheTanInteriorBright: v("porsche-tan-interior-bright.jpg"),
  porscheShowcaseBright: v("porsche-showcase-bright.jpg"),
  interiorWhiteLexusDashboard: v("vernon-01-lexus-white-dash.jpg"),
  interiorWhiteLexusFsport: v("vernon-02-lexus-fsport-driver.jpg"),
  redLeatherBefore: v("red-leather-before.jpg"),
  redLeatherAfter: v("red-leather-after.jpg"),
  paintBefore: v("vernon-12-paint-hood-before.jpg"),
  paintAfter: v("vernon-16-paint-hood-after.jpg"),
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
    src: v("vernon-04-lexus-interior.jpg"),
    alt: "Luxury white interior finish",
    label: "Cabin Detail",
  },
  {
    src: v("vernon-05-lexus-fsport.jpg"),
    alt: "F Sport white leather interior",
    label: "F Sport Finish",
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
    title: "Interior Deep Clean",
    category: "Interior",
    beforeSrc: CLIENT_IMAGES.baInteriorBefore,
    afterSrc: CLIENT_IMAGES.baInteriorAfter,
    beforeAlt: "Vehicle interior before professional deep cleaning",
    afterAlt: "Restored luxury SUV interior after deep clean",
  },
  {
    title: "Tail Light Restoration",
    category: "Exterior",
    beforeSrc: CLIENT_IMAGES.baHeadlightBefore,
    afterSrc: CLIENT_IMAGES.baHeadlightAfter,
    beforeAlt: "Cloudy taillight lens before restoration",
    afterAlt: "Clear taillight after polish and restoration",
  },
  {
    title: "Paint Refinement",
    category: "Paint Correction",
    beforeSrc: CLIENT_IMAGES.paintBefore,
    afterSrc: CLIENT_IMAGES.paintAfter,
    beforeAlt: "Oxidized hood clear coat before correction",
    afterAlt: "Deep gloss hood after paint refinement",
  },
  {
    title: "Leather Seat Restoration",
    category: "Leather & Seats",
    beforeSrc: CLIENT_IMAGES.redLeatherBefore,
    afterSrc: CLIENT_IMAGES.redLeatherAfter,
    beforeAlt: "Leather seats before cleaning and conditioning",
    afterAlt: "Leather seats restored after professional detailing",
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
