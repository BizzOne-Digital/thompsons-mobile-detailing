export const SITE_IMAGES = {
  hero: "/hero-bg.jpg",
  mobileSunsetSedan: "/images/mobile-sunset-sedan.jpg",
  interiorExtraction: "/images/interior-extraction.jpg",
  suvFullDetail: "/images/suv-full-detail.jpg",
  foamWashArizona: "/images/foam-wash-arizona.jpg",
  ceramicCoating: "/images/client/ceramic-coating-finish.jpg",
  paintCorrection: "/images/paint-correction.jpg",
  engineBay: "/images/engine-bay.jpg",
  carpetExtraction: "/images/carpet-extraction.jpg",
  headlightRestoration: "/images/headlight-restoration.jpg",
  mobileVanSetup: "/images/mobile-van-setup.jpg",
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
  "paint-correction": "/images/client/ba-04-headlight-after.jpg",
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

/** Public results / gallery page showcase photos */
export const RESULTS_GALLERY = [
  {
    id: "exterior-sedan-sunset",
    title: "Exterior finish at golden hour",
    category: "Exterior" as const,
    imageSrc: "/images/gallery/exterior-sedan-sunset.jpg",
    imageAlt:
      "Glossy black luxury sedan after mobile detailing in the Arizona desert at sunset",
    featured: true,
  },
  {
    id: "interior-luxury-suv",
    title: "Premium interior detail",
    category: "Interior" as const,
    imageSrc: "/images/gallery/interior-luxury-suv.jpg",
    imageAlt:
      "Clean leather interior of an SUV detailed on location in the desert",
    featured: true,
  },
  {
    id: "paint-refinement-studio",
    title: "Paint refinement & clarity",
    category: "Paint Correction" as const,
    imageSrc: "/images/gallery/paint-refinement-studio.jpg",
    imageAlt: "Mirror-finish blue paint after professional paint refinement",
    featured: false,
  },
  {
    id: "ceramic-hydrophobic",
    title: "Hydrophobic ceramic protection",
    category: "Ceramic Coating" as const,
    imageSrc: "/images/gallery/ceramic-hydrophobic-finish.jpg",
    imageAlt:
      "Water beading on a detailed black sedan after ceramic coating",
    featured: false,
  },
  {
    id: "headlight-clarity",
    title: "Headlight clarity & finish",
    category: "Headlights" as const,
    imageSrc: "/images/gallery/headlight-clarity.jpg",
    imageAlt: "Crystal-clear headlight on a refined navy blue luxury sedan",
    featured: false,
  },
  {
    id: "interior-full-cabin",
    title: "Full cabin interior reset",
    category: "Carpets and Seats" as const,
    imageSrc: "/images/gallery/interior-full-cabin.jpg",
    imageAlt:
      "Spotless SUV interior with doors open after deep cleaning in Arizona",
    featured: false,
  },
] as const;

export const HOME_GALLERY_STRIP = [
  {
    src: SITE_IMAGES.mobileVanSetup,
    alt: "Fully equipped mobile detailing van in Arizona",
    label: "Fully Mobile",
  },
  {
    src: SITE_IMAGES.interiorExtraction,
    alt: "Interior seat extraction detailing",
    label: "Interior Deep Clean",
  },
  {
    src: SITE_IMAGES.paintCorrection,
    alt: "Paint correction with professional polisher",
    label: "Paint Correction",
  },
  {
    src: SITE_IMAGES.ceramicCoating,
    alt: "Ceramic coating water beading on luxury paint",
    label: "Ceramic Protection",
  },
  {
    src: SITE_IMAGES.engineBay,
    alt: "Engine bay detailing service",
    label: "Engine Bay",
  },
  {
    src: SITE_IMAGES.headlightRestoration,
    alt: "Headlight restoration and paint refinement",
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
