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
    estimatedDuration: "1.5 to 3 hours",
  },
  {
    name: "Restore Detail",
    slug: "restore-detail",
    category: "Full Detail Packages",
    shortDescription:
      "Deep clean full detail for vehicles with visible buildup, stains, and worn interior surfaces.",
    fullDescription:
      "Designed for vehicles that need more than routine maintenance due to visible buildup, stains, spills, embedded dirt, carpet discoloration, and interior surfaces that have started to look worn or neglected. Includes everything in Refresh Detail, plus deep shampoo and extraction, leather conditioning, and headliner spot treatment.",
    features: [
      "Everything in Refresh Detail",
      "Deep shampoo and extraction of carpets, floor mats, and fabric seats",
      "Leather seats cleaned and conditioned where applicable",
      "Headliner spot-stain treatment",
      "Hard plastics cleaned, conditioned, and protected",
      "Signature Foam Hand Wash included",
    ],
    vehiclePrices: { sedan: 229, midsize: 249, large: 289 },
    startingPrice: 229,
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
      "Signature Foam Hand Wash included",
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
      "Professional Signature Foam Hand Wash designed to safely remove dirt, road film, bug residue, and surface contaminants. Includes 6-month paint protection to help protect against sun damage, oxidation, water spotting, environmental contaminants, and road grime while enhancing gloss and making future washes easier.",
    features: [
      "Includes 6-Month Paint Protection: Helps protect against sun damage, oxidation, water spotting, environmental contaminants, and road grime while enhancing gloss and making future washes easier",
      "Safe hand wash process",
      "Wheel and tire cleaning",
      "Door jambs wiped",
      "Streak-free glass",
      "Premium finish dry",
    ],
    vehiclePrices: { sedan: 99, midsize: 129, large: 149 },
    startingPrice: 99,
    displayOrder: 10,
    estimatedDuration: "1–2 hours",
  },
  {
    name: "Recurring Customer Maintenance Wash",
    slug: "recurring-maintenance-wash",
    category: "Exterior Services",
    shortDescription:
      "Maintenance wash for returning customers on a regular 3–6 week schedule.",
    fullDescription:
      "Available for returning customers who stay on a regular 3–6 week maintenance schedule. Keeps your vehicle looking sharp between full details with the same professional care you expect from Thompson's Mobile Detailing AZ.",
    features: [
      "Exterior maintenance hand wash",
      "Light wheel and tire cleaning",
      "Streak-free glass",
      "For returning customers on a 3–6 week schedule",
    ],
    vehiclePrices: { sedan: 89, midsize: 89, large: 89 },
    startingPrice: 89,
    displayOrder: 11,
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
  {
    name: "Leather Cleaning, Conditioning & Protection",
    slug: "leather-cleaning-conditioning-protection",
    category: "Interior Services",
    shortDescription:
      "Deep-cleans and protects leather seating for a softer, cleaner appearance.",
    fullDescription:
      "Deep-cleans leather seating to remove dirt, body oils, grime, and buildup, then conditions and protects the leather to help maintain a softer, cleaner appearance and reduce drying, fading, and premature wear from heat and sunlight.",
    features: [
      "Removes dirt, body oils, grime, and buildup from leather",
      "Conditions and protects leather surfaces",
      "Helps reduce drying, fading, and heat-related wear",
    ],
    vehiclePrices: { sedan: 99, midsize: 99, large: 99 },
    startingPrice: 99,
    displayOrder: 28,
    estimatedDuration: "1–2 hours",
  },
  {
    name: "Fabric Seat Shampoo & Extraction",
    slug: "fabric-seat-shampoo-extraction",
    category: "Interior Services",
    shortDescription:
      "Deep-cleans fabric seats with shampooing and extraction.",
    fullDescription:
      "Deep-cleans fabric seating using shampooing and extraction to remove dirt, spills, staining, and embedded buildup. Final pricing is based on how heavily soiled the seats are and the severity of embedded stains, determined upon inspection.",
    features: [
      "Shampooing and extraction of fabric seats",
      "Removes dirt, spills, staining, and embedded buildup",
      "Final price based on soil level at inspection",
    ],
    vehiclePrices: { sedan: 129, midsize: 129, large: 129 },
    startingPrice: 129,
    displayOrder: 29,
    estimatedDuration: "2–4 hours",
  },
  {
    name: "Add Carpet Shampoo & Extraction",
    slug: "carpet-shampoo-extraction",
    category: "Interior Services",
    shortDescription:
      "Adds deep shampooing and extraction of carpeted areas.",
    fullDescription:
      "Adds deep shampooing and extraction of the vehicle's carpeted areas to remove dirt, stains, and embedded buildup.",
    features: [
      "Deep shampoo and extraction of carpeted areas",
      "Removes dirt, stains, and embedded buildup",
      "Often added with fabric seat cleaning",
    ],
    vehiclePrices: { sedan: 49, midsize: 49, large: 49 },
    startingPrice: 49,
    displayOrder: 30,
    estimatedDuration: "1–2 hours",
  },
  {
    name: "Interior Plastic & Trim Restoration",
    slug: "interior-plastic-trim-restoration",
    category: "Interior Services",
    shortDescription:
      "Restores faded, dull interior plastics and trim for a darker, refreshed appearance.",
    fullDescription:
      "Restores faded, dull, and worn interior plastics, including door panels, dashboard surfaces, center console, glove compartment, kick panels, pillars, and other trim for a darker, cleaner, refreshed appearance.",
    features: [
      "Door panels, dashboard, console, kick panels, pillars, and trim",
      "Darker, cleaner, refreshed appearance",
      "Durability: up to 6 months",
    ],
    vehiclePrices: { sedan: 79, midsize: 79, large: 79 },
    startingPrice: 79,
    displayOrder: 31,
    estimatedDuration: "1–2 hours",
  },
  {
    name: "Interior Ceramic Protection",
    slug: "interior-ceramic-protection",
    category: "Interior Services",
    shortDescription:
      "Protective barrier for leather, vinyl, and interior plastics against spills and UV.",
    fullDescription:
      "Adds a protective barrier to leather, vinyl, and interior plastics to help resist spills, stains, body oils, heat, sunlight, and everyday buildup while making routine cleaning easier.",
    features: [
      "Leather, vinyl, and interior plastics",
      "Helps resist spills, stains, body oils, heat, and sunlight",
      "Protection: up to 6 months",
    ],
    vehiclePrices: { sedan: 89, midsize: 89, large: 89 },
    startingPrice: 89,
    displayOrder: 32,
    estimatedDuration: "1–2 hours",
  },
  {
    name: "Exterior Trim Restoration",
    slug: "exterior-trim-restoration-service",
    category: "Exterior Services",
    shortDescription:
      "Restores faded and weathered exterior plastics and trim.",
    fullDescription:
      "Restores faded and weathered exterior plastics, including cowl panels, mirror caps, bumper trim, fender trim, windshield and roof moldings, pillar trim, and other exterior plastic surfaces.",
    features: [
      "Cowl panels, mirror caps, bumper and fender trim, moldings, and pillars",
      "Restores faded and weathered exterior plastics",
      "Durability: up to 6 months",
    ],
    vehiclePrices: { sedan: 79, midsize: 79, large: 79 },
    startingPrice: 79,
    displayOrder: 40,
    estimatedDuration: "1–2 hours",
  },
  {
    name: "Headlight Restoration",
    slug: "headlight-restoration-service",
    category: "Exterior Services",
    shortDescription:
      "Removes cloudy, yellowed buildup from headlight lenses for a clearer appearance.",
    fullDescription:
      "Removes cloudy, yellowed, and oxidized buildup from headlight lenses to restore a clearer, brighter appearance.",
    features: [
      "Removes oxidation and yellowing from lenses",
      "Clearer, brighter headlight appearance",
    ],
    vehiclePrices: { sedan: 69, midsize: 69, large: 69 },
    startingPrice: 69,
    displayOrder: 41,
    estimatedDuration: "1 hour",
  },
  {
    name: "Clay Bar & Paint Decontamination",
    slug: "clay-bar-paint-decontamination",
    category: "Exterior Services",
    shortDescription:
      "Removes bonded contaminants normal washing cannot remove.",
    fullDescription:
      "Removes tree sap, tar, overspray, rail dust, road grime, bug splatter, and other bonded contaminants that normal washing cannot remove. Leaves the paint smoother, cleaner, and properly prepared for protection.",
    features: [
      "Removes sap, tar, overspray, rail dust, grime, and bug splatter",
      "Smoother, cleaner paint prepared for protection",
    ],
    vehiclePrices: { sedan: 69, midsize: 69, large: 69 },
    startingPrice: 69,
    displayOrder: 42,
    estimatedDuration: "1–2 hours",
  },
  {
    name: "Water Spot Removal & Glass Restoration",
    slug: "water-spot-removal-glass-restoration",
    category: "Exterior Services",
    shortDescription:
      "Removes hard-water deposits and stubborn spotting from paint and glass.",
    fullDescription:
      "Removes hard-water deposits, mineral buildup, and stubborn spotting from exterior paint and glass. Deeply etched water spots may require paint correction.",
    features: [
      "Hard-water and mineral buildup removal on paint and glass",
      "Deeply etched spots may require paint correction",
    ],
    vehiclePrices: { sedan: 89, midsize: 89, large: 89 },
    startingPrice: 89,
    displayOrder: 43,
    estimatedDuration: "1–3 hours",
  },
  {
    name: "Wheel, Tire & Wheel-Well Liner Deep Cleaning",
    slug: "wheel-tire-well-deep-cleaning",
    category: "Exterior Services",
    shortDescription:
      "Deep-cleans wheels, tires, and wheel-well liners.",
    fullDescription:
      "Deep-cleans heavy brake dust, road grime, mud, tire buildup, and embedded dirt from the wheels, tires, and the wheel-well liners located directly above and behind the tires.",
    features: [
      "Wheels, tires, and wheel-well liners",
      "Removes brake dust, grime, mud, and embedded dirt",
    ],
    vehiclePrices: { sedan: 89, midsize: 89, large: 89 },
    startingPrice: 89,
    displayOrder: 44,
    estimatedDuration: "1–2 hours",
  },
  {
    name: "Engine Bay Detail",
    slug: "engine-bay-detail",
    category: "Exterior Services",
    shortDescription:
      "Cleans dust, dirt, grease, and buildup throughout the engine bay.",
    fullDescription:
      "Removes dust, dirt, grease, and buildup throughout the engine bay, leaving components and surrounding surfaces clean, refreshed, and well maintained.",
    features: [
      "Engine bay surfaces and components cleaned",
      "Removes dust, dirt, grease, and buildup",
    ],
    vehiclePrices: { sedan: 79, midsize: 79, large: 79 },
    startingPrice: 79,
    displayOrder: 45,
    estimatedDuration: "1–2 hours",
  },
  {
    name: "Single-Panel Paint Correction",
    slug: "single-panel-paint-correction",
    category: "Exterior Services",
    shortDescription:
      "Corrects isolated paint defects on one panel for restored clarity and gloss.",
    fullDescription:
      "Corrects isolated paint defects on one panel, including oxidation, swirl marks, water-spot etching, light scratches, haze, and dullness. The panel is machine polished to restore clarity, depth, and a high-gloss finish.",
    features: [
      "One panel machine polish",
      "Reduces oxidation, swirls, light scratches, and haze",
      "Restores clarity, depth, and high-gloss finish",
    ],
    vehiclePrices: { sedan: 99, midsize: 99, large: 99 },
    startingPrice: 99,
    displayOrder: 46,
    estimatedDuration: "2–4 hours",
  },
];

const DETAIL_PACKAGE_SLUGS = ["refresh-detail", "restore-detail", "reset-detail"];

export const seedAddOns = [
  {
    name: "Leather Cleaning, Conditioning & Protection",
    slug: "leather-cleaning-conditioning-protection",
    category: "Interior" as const,
    description:
      "Deep-cleans leather seating to remove dirt, body oils, grime, and buildup, then conditions and protects the leather to help maintain a softer, cleaner appearance and reduce drying, fading, and premature wear from heat and sunlight.",
    pricingType: "starting" as const,
    fixedPrice: 99,
    serviceSlugs: DETAIL_PACKAGE_SLUGS,
    displayOrder: 1,
  },
  {
    name: "Fabric Seat Shampoo & Extraction",
    slug: "fabric-seat-shampoo-extraction",
    category: "Interior" as const,
    description:
      "Deep-cleans fabric seating using shampooing and extraction to remove dirt, spills, staining, and embedded buildup. Final pricing is based on how heavily soiled the seats are and the severity of embedded stains, determined upon inspection.",
    pricingType: "starting" as const,
    fixedPrice: 129,
    serviceSlugs: DETAIL_PACKAGE_SLUGS,
    displayOrder: 2,
  },
  {
    name: "Add Carpet Shampoo & Extraction",
    slug: "carpet-shampoo-extraction",
    category: "Interior" as const,
    description:
      "Adds deep shampooing and extraction of the vehicle's carpeted areas to remove dirt, stains, and embedded buildup.",
    pricingType: "starting" as const,
    fixedPrice: 49,
    serviceSlugs: DETAIL_PACKAGE_SLUGS,
    displayOrder: 3,
  },
  {
    name: "Interior Plastic & Trim Restoration",
    slug: "interior-plastic-trim-restoration",
    category: "Interior" as const,
    description:
      "Restores faded, dull, and worn interior plastics, including door panels, dashboard surfaces, center console, glove compartment, kick panels, pillars, and other trim for a darker, cleaner, refreshed appearance. Durability: up to 6 months.",
    pricingType: "starting" as const,
    fixedPrice: 79,
    serviceSlugs: DETAIL_PACKAGE_SLUGS,
    displayOrder: 4,
  },
  {
    name: "Interior Ceramic Protection",
    slug: "interior-ceramic-protection",
    category: "Interior" as const,
    description:
      "Adds a protective barrier to leather, vinyl, and interior plastics to help resist spills, stains, body oils, heat, sunlight, and everyday buildup while making routine cleaning easier. Protection: up to 6 months.",
    pricingType: "starting" as const,
    fixedPrice: 89,
    serviceSlugs: DETAIL_PACKAGE_SLUGS,
    displayOrder: 5,
  },
  {
    name: "Exterior Trim Restoration",
    slug: "exterior-trim-restoration",
    category: "Exterior" as const,
    description:
      "Restores faded and weathered exterior plastics, including cowl panels, mirror caps, bumper trim, fender trim, windshield and roof moldings, pillar trim, and other exterior plastic surfaces. Durability: up to 6 months.",
    pricingType: "starting" as const,
    fixedPrice: 79,
    serviceSlugs: DETAIL_PACKAGE_SLUGS,
    displayOrder: 6,
  },
  {
    name: "Headlight Restoration",
    slug: "headlight-restoration",
    category: "Exterior" as const,
    description:
      "Removes cloudy, yellowed, and oxidized buildup from headlight lenses to restore a clearer, brighter appearance.",
    pricingType: "starting" as const,
    fixedPrice: 69,
    serviceSlugs: DETAIL_PACKAGE_SLUGS,
    displayOrder: 7,
  },
  {
    name: "Clay Bar & Paint Decontamination",
    slug: "clay-bar-decontamination",
    category: "Exterior" as const,
    description:
      "Removes tree sap, tar, overspray, rail dust, road grime, bug splatter, and other bonded contaminants that normal washing cannot remove. Leaves the paint smoother, cleaner, and properly prepared for protection.",
    pricingType: "starting" as const,
    fixedPrice: 69,
    serviceSlugs: DETAIL_PACKAGE_SLUGS,
    displayOrder: 8,
  },
  {
    name: "Water Spot Removal & Glass Restoration",
    slug: "water-spot-removal-glass-restoration",
    category: "Exterior" as const,
    description:
      "Removes hard-water deposits, mineral buildup, and stubborn spotting from exterior paint and glass. Deeply etched water spots may require paint correction.",
    pricingType: "starting" as const,
    fixedPrice: 89,
    serviceSlugs: DETAIL_PACKAGE_SLUGS,
    displayOrder: 9,
  },
  {
    name: "Wheel, Tire & Wheel-Well Liner Deep Cleaning",
    slug: "wheel-tire-well-deep-cleaning",
    category: "Exterior" as const,
    description:
      "Deep-cleans heavy brake dust, road grime, mud, tire buildup, and embedded dirt from the wheels, tires, and the wheel-well liners located directly above and behind the tires.",
    pricingType: "starting" as const,
    fixedPrice: 89,
    serviceSlugs: DETAIL_PACKAGE_SLUGS,
    displayOrder: 10,
  },
  {
    name: "Engine Bay Detail",
    slug: "engine-bay-detail",
    category: "Exterior" as const,
    description:
      "Removes dust, dirt, grease, and buildup throughout the engine bay, leaving components and surrounding surfaces clean, refreshed, and well maintained.",
    pricingType: "starting" as const,
    fixedPrice: 79,
    serviceSlugs: DETAIL_PACKAGE_SLUGS,
    displayOrder: 11,
  },
  {
    name: "Single-Panel Paint Correction",
    slug: "single-panel-paint-correction",
    category: "Exterior" as const,
    description:
      "Corrects isolated paint defects on one panel, including oxidation, swirl marks, water-spot etching, light scratches, haze, and dullness. The panel is machine polished to restore clarity, depth, and a high-gloss finish.",
    pricingType: "starting" as const,
    fixedPrice: 99,
    serviceSlugs: DETAIL_PACKAGE_SLUGS,
    displayOrder: 12,
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
