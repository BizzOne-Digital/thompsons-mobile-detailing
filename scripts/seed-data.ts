export const seedServices = [
  {
    name: "Refresh Detail",
    slug: "refresh-detail",
    category: "Full Detail Packages",
    shortDescription:
      "Maintenance-level full detail for well-maintained vehicles needing professional upkeep.",
    fullDescription:
      "Designed for well-maintained vehicles that are regularly cleaned and need professional upkeep to remove everyday dust, light debris, fingerprints, and normal surface buildup while keeping the interior and exterior clean, polished, and properly maintained.",
    features: [
      "Complete interior vacuuming of seats, underneath seats, carpets, floor mats, and cargo or trunk area",
      "Dashboard, center console, cupholders, door panels, and steering wheel cleaned",
      "Air vents cleaned and refreshed",
      "Door jambs cleaned and detailed",
      "Interior glass cleaned streak-free",
      "Light interior dressing and protection",
      "Final quality inspection",
      "Signature Foam Hand Wash included",
    ],
    vehiclePrices: { sedan: 149, midsize: 169, large: 189 },
    startingPrice: 149,
    featured: true,
    displayOrder: 1,
    estimatedDuration: "3–5 hours",
  },
  {
    name: "Restore Detail",
    slug: "restore-detail",
    category: "Full Detail Packages",
    shortDescription:
      "Deep clean full detail for vehicles with visible buildup, stains, and worn interior surfaces.",
    fullDescription:
      "Designed for vehicles that need more than routine maintenance due to visible buildup, stains, spills, embedded dirt, carpet discoloration, and interior surfaces that have started to look worn or neglected. Includes everything in Refresh Detail, plus deep shampoo and extraction, leather conditioning, headliner spot treatment, and 6-month paint protection.",
    features: [
      "Everything in Refresh Detail",
      "Deep shampoo and extraction of carpets, floor mats, and fabric seats",
      "Leather seats cleaned and conditioned where applicable",
      "Headliner spot-stain treatment",
      "Hard plastics cleaned, conditioned, and protected",
      "6-month paint protection",
      "Signature Foam Hand Wash included",
    ],
    vehiclePrices: { sedan: 219, midsize: 239, large: 289 },
    startingPrice: 219,
    featured: true,
    displayOrder: 2,
    estimatedDuration: "4–6 hours",
  },
  {
    name: "Reset Detail",
    slug: "reset-detail",
    category: "Full Detail Packages",
    shortDescription:
      "Complete restoration for heavily neglected vehicles needing the highest level of cleaning.",
    fullDescription:
      "Designed for heavily neglected vehicles that need the highest level of cleaning and restoration due to severe buildup, embedded stains, excessive pet hair, spills, odors, and worn or faded interior surfaces. Includes everything in Restore Detail, plus intensive extraction, odor treatment, full headliner cleaning, and exterior trim restoration.",
    features: [
      "Everything in Restore Detail",
      "Intensive shampoo and hot-water extraction",
      "Heavy pet hair removal",
      "Interior odor treatment",
      "Full headliner deep cleaning and restoration",
      "Exterior trim restoration for faded plastics",
      "6-month paint protection",
    ],
    vehiclePrices: { sedan: 399, midsize: 499, large: 599 },
    startingPrice: 399,
    featured: true,
    displayOrder: 3,
    estimatedDuration: "6–10 hours",
  },
  {
    name: "Signature Foam Hand Wash",
    slug: "signature-foam-hand-wash",
    category: "Exterior Services",
    shortDescription:
      "Professional exterior hand wash to safely remove dirt, road film, and contaminants.",
    fullDescription:
      "Professional exterior hand wash designed to safely remove dirt, road film, bug residue, and surface contaminants while leaving the vehicle clean and properly finished.",
    features: [
      "Safe hand wash process",
      "Wheel and tire cleaning",
      "Door jambs wiped",
      "Streak-free glass",
      "Premium finish dry",
    ],
    vehiclePrices: { sedan: 69, midsize: 79, large: 89 },
    startingPrice: 69,
    displayOrder: 10,
    estimatedDuration: "1–2 hours",
  },
  {
    name: "5-Year Professional-Grade Ceramic Coating",
    slug: "ceramic-coating",
    category: "Ceramic Coating",
    shortDescription:
      "Long-term paint protection with deeper gloss and easier maintenance.",
    fullDescription:
      "Professional ceramic coating designed to provide long-term paint protection, deeper gloss, easier maintenance, and added protection against sun damage, oxidation, water spotting, and environmental contaminants.",
    features: [
      "Paint preparation and decontamination",
      "Professional-grade ceramic application",
      "Enhanced gloss and hydrophobic finish",
      "Long-term UV and environmental protection",
    ],
    vehiclePrices: { sedan: 299, midsize: 399, large: 499 },
    startingPrice: 299,
    displayOrder: 20,
    estimatedDuration: "1–2 days",
  },
  {
    name: "Paint Correction",
    slug: "paint-correction",
    category: "Paint Correction",
    shortDescription:
      "Machine correction to reduce swirls, oxidation, and restore clarity.",
    fullDescription:
      "Professional machine paint correction designed to remove or significantly reduce oxidation, swirl marks, water spots, haze, and surface scratches while restoring clarity, depth, and a high-gloss finish.",
    features: [
      "Paint assessment",
      "Multi-stage machine polishing",
      "Swirl and defect reduction",
      "High-gloss finish refinement",
    ],
    startingPrice: 99,
    customQuote: true as const,
    displayOrder: 21,
    estimatedDuration: "Varies",
  },
];

export const seedAddOns = [
  {
    name: "Pet Hair Removal",
    slug: "pet-hair-removal",
    description:
      "Removal of pet hair from carpets, seats, floor mats, and fabric surfaces.",
    pricingType: "starting" as const,
    fixedPrice: 49,
    displayOrder: 1,
  },
  {
    name: "Engine Bay Cleaning",
    slug: "engine-bay-cleaning",
    description:
      "Professional cleaning of the engine bay to remove dust, dirt, grease, and buildup.",
    pricingType: "fixed" as const,
    fixedPrice: 69,
    displayOrder: 2,
  },
  {
    name: "Headlight Restoration",
    slug: "headlight-restoration",
    description:
      "Restores clarity to cloudy, yellowed, or oxidized headlights.",
    pricingType: "fixed" as const,
    fixedPrice: 59,
    displayOrder: 3,
  },
  {
    name: "Exterior Trim Restoration",
    slug: "exterior-trim-restoration",
    description: "Restores faded and weathered exterior plastics and trim.",
    pricingType: "starting" as const,
    fixedPrice: 79,
    displayOrder: 4,
  },
  {
    name: "Interior Odor Treatment",
    slug: "interior-odor-treatment",
    description: "Helps eliminate lingering interior odors.",
    pricingType: "fixed" as const,
    fixedPrice: 25,
    displayOrder: 5,
  },
  {
    name: "Clay Bar and Paint Decontamination",
    slug: "clay-bar-decontamination",
    description:
      "Removes bonded surface contaminants for smoother paint and better protection prep.",
    pricingType: "vehicle" as const,
    vehiclePrices: { sedan: 29, midsize: 39, large: 49 },
    displayOrder: 6,
  },
  {
    name: "Leather Seat Cleaning and Conditioning",
    slug: "leather-seat-cleaning",
    description: "Deep cleaning and conditioning of leather seating surfaces.",
    pricingType: "fixed" as const,
    fixedPrice: 99,
    displayOrder: 7,
  },
  {
    name: "Seat and Carpet Cleaning",
    slug: "seat-and-carpet-cleaning",
    description:
      "Deep cleaning, shampooing, and extraction of fabric seats, carpets, and floor mats.",
    pricingType: "fixed" as const,
    fixedPrice: 149,
    displayOrder: 8,
  },
];

export const seedFaqs = [
  {
    question: "What does mobile detailing mean?",
    answer:
      "We come to your home, workplace, apartment complex, garage, driveway, or another approved location with water, power, professional equipment, and premium products.",
    displayOrder: 1,
  },
  {
    question: "Do I need to provide water or electricity?",
    answer:
      "No. Thompson's Mobile Detailing AZ arrives fully equipped with the water, power, and professional tools needed to complete your service.",
    displayOrder: 2,
  },
  {
    question: "Which cities do you serve?",
    answer:
      "We serve Avondale, Buckeye, Goodyear, Litchfield Park, Surprise, Phoenix, Scottsdale, Glendale, Peoria, San Tan Valley, Gilbert, Mesa, Chandler, and surrounding Valley areas.",
    displayOrder: 3,
  },
  {
    question: "How long does a full detail take?",
    answer:
      "Timing depends on package, vehicle size, and condition. Refresh details typically take several hours, while Reset restoration details can take most of the day.",
    displayOrder: 4,
  },
  {
    question: "What is the difference between Refresh, Restore, and Reset?",
    answer:
      "Refresh is maintenance-level cleaning for well-kept vehicles. Restore is a deep clean for visible buildup and stains. Reset is our highest-level restoration for heavily neglected vehicles.",
    displayOrder: 5,
  },
  {
    question: "Is my booking immediately confirmed?",
    answer:
      "No. Your request is pending review until we contact you and confirm your appointment time.",
    displayOrder: 6,
  },
  {
    question: "How does custom paint-correction pricing work?",
    answer:
      "Pricing depends on paint condition, defect severity, and panel coverage. Upload vehicle photos with your booking or quote request for an accurate estimate.",
    displayOrder: 7,
  },
  {
    question: "How long does ceramic coating last?",
    answer:
      "Our professional-grade ceramic coating is designed for long-term protection with proper maintenance. Results vary based on environment, care, and vehicle use.",
    displayOrder: 8,
  },
];

export const seedBlogCategories = [
  { name: "Vehicle Care", slug: "vehicle-care" },
  { name: "Detailing Tips", slug: "detailing-tips" },
  { name: "Arizona Climate", slug: "arizona-climate" },
];

export const seedTestimonials = [
  {
    customerName: "Marcus T.",
    rating: 5,
    vehicle: "2022 BMW 5 Series",
    serviceReceived: "Restore Detail",
    review:
      "Showed up on time to my driveway in Goodyear with everything they needed. The interior looks brand new and the paint has a depth I did not think was possible without a body shop. Will book again.",
    reviewSource: "seed",
    featured: true,
    approved: true,
    displayOrder: 1,
  },
  {
    customerName: "Jennifer & David R.",
    rating: 5,
    vehicle: "Family SUV",
    serviceReceived: "Reset Detail",
    review:
      "We had kids, dogs, and Arizona dust working against us. Thompson's team was professional, thorough, and honest about what the Reset package would cover. The van smells and looks incredible.",
    reviewSource: "seed",
    featured: true,
    approved: true,
    displayOrder: 2,
  },
  {
    customerName: "Alejandro V.",
    rating: 5,
    vehicle: "Tesla Model 3",
    serviceReceived: "Refresh Detail",
    review:
      "Fully mobile service at my office in Phoenix — huge time saver. Attention to detail on the wheels, glass, and interior was top notch. Factory fresh is not marketing talk; that is what I got.",
    reviewSource: "seed",
    featured: true,
    approved: true,
    displayOrder: 3,
  },
  {
    customerName: "Priya K.",
    rating: 5,
    vehicle: "Honda Accord",
    serviceReceived: "Signature Foam Hand Wash",
    review:
      "Booked online, got a call back the same day to confirm, and they did an amazing hand wash in my apartment garage. Fair pricing and zero hassle.",
    reviewSource: "seed",
    featured: true,
    approved: true,
    displayOrder: 4,
  },
  {
    customerName: "Chris M.",
    rating: 5,
    vehicle: "Chevy Silverado",
    serviceReceived: "Paint Correction",
    review:
      "Swirls and haze from years of sun were killing the look of my truck. They walked me through custom quote photos and delivered a finish that turns heads in Avondale.",
    reviewSource: "seed",
    featured: false,
    approved: true,
    displayOrder: 5,
  },
  {
    customerName: "Sandra L.",
    rating: 5,
    vehicle: "Mercedes GLE",
    serviceReceived: "Ceramic Coating",
    review:
      "Water beads like crazy after the ceramic coating and the gloss is unreal. They explained maintenance and were careful around every panel. Highly recommend for desert heat protection.",
    reviewSource: "seed",
    featured: false,
    approved: true,
    displayOrder: 6,
  },
  {
    customerName: "Tyler W.",
    rating: 5,
    vehicle: "Ford F-150",
    serviceReceived: "Restore Detail + Pet Hair",
    review:
      "Pet hair was everywhere. They got it out of the carpets and seats and the whole cab feels like a new truck. Communication was clear from booking to finish.",
    reviewSource: "seed",
    featured: false,
    approved: true,
    displayOrder: 7,
  },
  {
    customerName: "Elena G.",
    rating: 5,
    vehicle: "Toyota Camry",
    serviceReceived: "Refresh Detail",
    review:
      "Five stars for punctuality, professionalism, and results. I have used mobile detailers before — this is the first time I felt the price matched the quality.",
    reviewSource: "seed",
    featured: false,
    approved: true,
    displayOrder: 8,
  },
];
