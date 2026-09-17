/** Real client photography — files in /public/images/client/ */
const base = "/images/client";

export const CLIENT_IMAGES = {
  baInteriorBefore: `${base}/ba-02-interior-before.jpg`,
  baInteriorAfter: `${base}/ba-01-interior-after.jpg`,
  baHeadlightBefore: `${base}/ba-03-headlight-before.jpg`,
  baHeadlightAfter: `${base}/ba-04-headlight-after.jpg`,
  baExteriorShowcase: `${base}/ba-05-exterior-showcase.jpg`,
  interior06: `${base}/interior-06.jpg`,
  interior07: `${base}/interior-07.jpg`,
  interior08: `${base}/interior-08.jpg`,
  interior09: `${base}/interior-09.jpg`,
  interior10: `${base}/interior-10.jpg`,
  engineBefore: `${base}/engine-11-before.jpg`,
  engineAfter: `${base}/engine-12-after.jpg`,
  engineShowcase: `${base}/engine-13-showcase.jpg`,
  homeMobileVan: `${base}/home-mobile-van.jpg`,
  deepClean15: `${base}/deep-clean-15.jpg`,
  deepClean16: `${base}/deep-clean-16.jpg`,
  deepClean17: `${base}/deep-clean-17.jpg`,
  aboutEscalade: `${base}/about-escalade.jpg`,
  /** Vernon — replace public/images/client/owner.jpg with email portrait */
  ownerPortrait: `${base}/owner.jpg`,
  /** Vernon + crew — replace public/images/client/team-group.jpg */
  teamGroup: `${base}/team-group.jpg`,
  /** Electric blue Dodge Charger (tmdaz.com hero) — replace hero-electric-blue-charger.jpg */
  heroElectricBlueCharger: `${base}/hero-electric-blue-charger.jpg`,
  porscheTanInteriorBright: `${base}/porsche-tan-interior-bright.jpg`,
  interiorWhiteLexusDashboard: `${base}/interior-white-lexus-dashboard.png`,
  interiorWhiteLexusFsport: `${base}/interior-white-lexus-fsport.png`,
  redLeatherBefore: `${base}/red-leather-before.jpg`,
  redLeatherAfter: `${base}/red-leather-after.jpg`,
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
    title: "Headlight Restoration",
    category: "Headlights",
    beforeSrc: CLIENT_IMAGES.baHeadlightBefore,
    afterSrc: CLIENT_IMAGES.baHeadlightAfter,
    beforeAlt: "Cloudy oxidized headlight before restoration",
    afterAlt: "Clear headlight after restoration and polish",
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
    title: "Red Leather Seat Restoration",
    category: "Leather & Seats",
    beforeSrc: CLIENT_IMAGES.redLeatherBefore,
    afterSrc: CLIENT_IMAGES.redLeatherAfter,
    beforeAlt: "Leather seats before cleaning and conditioning",
    afterAlt: "Red leather seats restored after professional detailing",
  },
] as const;

export const CLIENT_INTERIOR_GALLERY = [
  ...CLIENT_WHITE_INTERIOR_GALLERY,
  { src: CLIENT_IMAGES.interior06, alt: "Interior detailing — luxury SUV cabin", label: "Interior Detail" },
  { src: CLIENT_IMAGES.interior07, alt: "Escalade interior deep clean", label: "Deep Clean" },
  { src: CLIENT_IMAGES.interior08, alt: "Premium leather interior finish", label: "Leather & Trim" },
  { src: CLIENT_IMAGES.interior09, alt: "Front cabin restoration", label: "Cabin Reset" },
  { src: CLIENT_IMAGES.interior10, alt: "Second row interior detail", label: "Full Interior" },
] as const;

export const CLIENT_ENGINE_GALLERY = [
  { src: CLIENT_IMAGES.engineBefore, alt: "Engine bay before cleaning" },
  { src: CLIENT_IMAGES.engineAfter, alt: "Engine bay after professional cleaning" },
  { src: CLIENT_IMAGES.engineShowcase, alt: "Detailed engine bay on pickup truck" },
] as const;

export const CLIENT_DEEP_CLEAN_GALLERY = [
  { src: CLIENT_IMAGES.deepClean15, alt: "Porsche interior after deep clean" },
  { src: CLIENT_IMAGES.deepClean16, alt: "Full interior service with doors open" },
  { src: CLIENT_IMAGES.deepClean17, alt: "Carpet and seat deep clean results" },
] as const;

export const MOBILE_VAN_SERVICES = [
  "Interior Detailing",
  "Exterior Detailing",
  "Paint Protection",
  "Ceramic Coating",
  "Mobile Service",
] as const;
