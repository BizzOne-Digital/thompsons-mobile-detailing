import { CLIENT_IMAGES, CLIENT_SPOTLIGHT_GALLERY } from "@/lib/client-images";
import {
  CLIENT_EXTERIOR_PORTFOLIO,
  CLIENT_EXTERIOR_PORTFOLIO_FEATURED,
} from "@/lib/client-portfolio";
import { RESULTS_GALLERY_PHOTO_COUNT } from "@/lib/client-media-curation";

const portfolio = (id: string, fallback: string) =>
  CLIENT_EXTERIOR_PORTFOLIO.find((p) => p.id === id)?.coverSrc ?? fallback;

export const SITE_IMAGES = {
  hero: CLIENT_IMAGES.heroElectricBlueCharger,
  mobileSunsetSedan: portfolio("ford-edge", "/images/portfolio/ford-edge/01-sunset.jpg"),
  interiorExtraction: CLIENT_IMAGES.deepClean15,
  suvFullDetail: portfolio("black-cadillac-escalade", CLIENT_IMAGES.aboutEscalade),
  foamWashArizona: portfolio("classic-car-foam-wash", CLIENT_IMAGES.aboutFoamWash),
  ceramicCoating: "/images/client/ceramic-coating-finish.jpg",
  paintCorrection: CLIENT_IMAGES.paintAfter,
  engineBay: CLIENT_IMAGES.engineAfter,
  carpetExtraction: CLIENT_IMAGES.deepClean16,
  headlightRestoration: CLIENT_IMAGES.baHeadlightAfter,
  mobileVanSetup: CLIENT_IMAGES.aboutMobileSetup,
} as const;

export const PACKAGE_IMAGES: Record<string, string> = {
  "refresh-detail": "/images/client/deep-clean-17.jpg",
  "restore-detail": "/images/client/deep-clean-16.jpg",
  "reset-detail": "/images/client/interior-10.jpg",
};

export const SERVICE_SLUG_IMAGES: Record<string, string> = {
  "refresh-detail": "/images/client/deep-clean-17.jpg",
  "restore-detail": "/images/client/deep-clean-16.jpg",
  "reset-detail": "/images/client/interior-10.jpg",
  "signature-foam-hand-wash": "/images/client/signature-foam-wash.jpg",
  "ceramic-coating": "/images/client/ceramic-coating-finish.jpg",
  "paint-correction": "/images/client/vernon-16-paint-hood-after.jpg",
  "engine-bay-cleaning": "/images/client/engine-12-after.jpg",
};

/** Side-by-side before/after composites for the home page results section */
export const HOME_BEFORE_AFTER = [
  {
    title: "Exterior Foam Wash",
    category: "Exterior",
    imageSrc: "/images/before-after/exterior-foam-wash.jpg",
    imageAlt:
      "Before and after exterior foam hand wash on a luxury sedan in Arizona",
  },
  {
    title: "Interior Extraction",
    category: "Interior",
    imageSrc: "/images/before-after/interior-extraction.jpg",
    imageAlt:
      "Before and after interior shampoo and extraction on fabric seats",
  },
  {
    title: "Paint Refinement",
    category: "Paint Correction",
    imageSrc: "/images/before-after/paint-refinement.jpg",
    imageAlt:
      "Before and after paint correction removing swirls on a blue sedan hood",
  },
  {
    title: "Full Detail",
    category: "Full Detail",
    imageSrc: "/images/before-after/full-detail.jpg",
    imageAlt:
      "Before and after full mobile detail on an SUV interior and exterior",
  },
] as const;

/** Public results / gallery — curated Vernon portfolio stills */
export const RESULTS_GALLERY = CLIENT_EXTERIOR_PORTFOLIO_FEATURED.slice(
  0,
  RESULTS_GALLERY_PHOTO_COUNT
).map(
  (project, index) => ({
    id: project.id,
    title: project.vehicle,
    category: "Exterior" as const,
    imageSrc: project.coverSrc,
    imageAlt:
      project.media[0]?.type === "image"
        ? project.media[0].alt
        : `${project.vehicle} after mobile detailing`,
    featured: index < 4,
  })
);

export const HOME_GALLERY_STRIP = [
  {
    src: CLIENT_IMAGES.aboutMobileSetup,
    alt: "Mobile detailing setup at a customer's driveway",
    label: "Fully Mobile",
  },
  ...CLIENT_SPOTLIGHT_GALLERY.map((item) => ({
    src: item.src,
    alt: item.alt,
    label: item.label,
  })),
  {
    src: CLIENT_IMAGES.baHeadlightAfter,
    alt: "Headlight restoration results",
    label: "Headlights",
  },
] as const;

export const DEMO_GALLERY_COMPARISONS = [
  {
    _id: "demo-exterior",
    title: "Exterior Foam Wash",
    category: "Exterior",
    beforeImage: {
      url: SITE_IMAGES.foamWashArizona,
      alt: "Vehicle during foam wash prep",
    },
    afterImage: {
      url: SITE_IMAGES.ceramicCoating,
      alt: "Finished glossy exterior protection",
    },
    caption: "Replace with your before/after uploads in admin.",
  },
  {
    _id: "demo-interior",
    title: "Interior Extraction",
    category: "Interior",
    beforeImage: {
      url: SITE_IMAGES.interiorExtraction,
      alt: "Interior extraction in progress",
    },
    afterImage: {
      url: SITE_IMAGES.carpetExtraction,
      alt: "Clean interior carpets and seats",
    },
    caption: "Admin-managed results gallery.",
  },
  {
    _id: "demo-paint",
    title: "Paint Refinement",
    category: "Paint Correction",
    beforeImage: {
      url: SITE_IMAGES.paintCorrection,
      alt: "Paint correction process",
    },
    afterImage: {
      url: SITE_IMAGES.headlightRestoration,
      alt: "Refined paint and clarity",
    },
    caption: "Professional machine polishing results.",
  },
  {
    _id: "demo-full",
    title: "Full Detail",
    category: "Exterior",
    beforeImage: {
      url: SITE_IMAGES.mobileSunsetSedan,
      alt: "Mobile detailing at customer location",
    },
    afterImage: {
      url: SITE_IMAGES.suvFullDetail,
      alt: "Completed full detail showcase",
    },
    caption: "Factory-fresh mobile results.",
  },
];
