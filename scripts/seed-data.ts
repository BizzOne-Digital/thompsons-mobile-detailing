export const seedServices = [
  {
    name: "Refresh Detail",
    slug: "refresh-detail",
    category: "Full Detail Packages",
    shortDescription:
      "For well-maintained vehicles showing light signs of daily use—dust, fingerprints, smudges, and minor dirt. For interiors without stains, pet hair, or heavy buildup—bringing back a factory-fresh appearance and a fresh, inviting scent.",
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
    vehiclePrices: { sedan: 169, midsize: 189, large: 209 },
    startingPrice: 169,
    featured: true,
    displayOrder: 1,
    estimatedDuration: "1.5 to 3 hours",
    customQuote: false,
  },
  {
    name: "Restore Detail",
    slug: "restore-detail",
    category: "Full Detail Packages",
    shortDescription:
      "For surface stains and spills on seats and carpets, accumulated grime, dull or worn-looking hard plastics, and thick dust and lint around buttons, crevices, and the steering wheel—bringing back a factory-fresh appearance and a fresh, inviting scent.",
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
    vehiclePrices: { sedan: 279, midsize: 319, large: 359 },
    startingPrice: 279,
    featured: true,
    displayOrder: 2,
    estimatedDuration: "4–6 hours",
    customQuote: false,
  },
  {
    name: "Reset Detail",
    slug: "reset-detail",
    category: "Full Detail Packages",
    shortDescription:
      "Our most intensive restoration for severely neglected interiors—deeply embedded stains, excessive pet hair, overpowering odors, and heavy layers of stubborn dirt and grime. Intensive cleaning, deep extraction, odor treatment, and hard plastic restoration remove severe buildup and revive faded, dull, and worn-looking surfaces, bringing back a factory-fresh appearance and a fresh, inviting scent.",
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
    vehiclePrices: { sedan: 449, midsize: 549, large: 649 },
    startingPrice: 449,
    featured: true,
    displayOrder: 3,
    estimatedDuration: "6–10 hours",
    customQuote: false,
  },
  {
    name: "Signature Foam Hand Wash + Clay Bar Treatment",
    slug: "signature-foam-hand-wash",
    category: "Exterior Services",
    shortDescription:
      "Includes Tire & Wheel Deep Cleaning + Tire Shine — protect your investment. Keep your vehicle clean, glossy, and protected year-round.",
    fullDescription:
      "Professional exterior hand wash with clay bar decontamination, tire and wheel deep cleaning, 6-month ceramic sealant, and tire shine.",
    features: [
      "Pre-rinse to loosen dirt and road grime",
      "Bug splatter, tree sap, and tar removal",
      "Foam cannon application and careful hand washing",
      "Tires and wheels deep cleaned",
      "Clay bar treatment to remove bonded contaminants",
      "Final rinse after clay bar treatment",
      "Exterior glass cleaned and vehicle hand dried",
      "6-month ceramic sealant applied",
      "Tire shine applied",
    ],
    vehiclePrices: { sedan: 99, midsize: 129, large: 149 },
    startingPrice: 99,
    displayOrder: 10,
    estimatedDuration: "1–2 hours",
    customQuote: false,
  },
  {
    name: "Recurring Customer Maintenance Wash",
    slug: "recurring-maintenance-wash",
    category: "Exterior Services",
    shortDescription:
      "Keep your vehicle clean, glossy, and protected between full details.",
    fullDescription:
      "For returning customers maintaining their vehicle every 3–6 weeks. Clay bar treatment and a fresh 6-month ceramic sealant application are priced separately when needed.",
    features: [
      "Pre-rinse, foam and hand wash",
      "Routine wheel and tire cleaning",
      "Exterior glass cleaning and hand drying",
      "Sealant refreshment and tire shine",
    ],
    vehiclePrices: { sedan: 79, midsize: 99, large: 119 },
    startingPrice: 79,
    displayOrder: 11,
    estimatedDuration: "1–2 hours",
    customQuote: false,
  },
  {
    name: "Monthly Interior & Exterior Maintenance Membership",
    slug: "monthly-maintenance-membership",
    category: "Exterior Services",
    shortDescription: "Keep your vehicle fresh inside and glossy outside.",
    fullDescription:
      "For returning customers maintaining their vehicle every 3–6 weeks after an initial detail appropriate to its condition.",
    features: [
      "Interior vacuuming and light cabin wipe-down",
      "Interior glass cleaning",
      "Exterior foam hand wash, wheels, glass, and hand dry",
      "Sealant refreshment and tire shine",
    ],
    vehiclePrices: { sedan: 139, midsize: 159, large: 179 },
    startingPrice: 139,
    displayOrder: 12,
    estimatedDuration: "2–3 hours",
    customQuote: false,
  },
  {
    name: "5-Year Professional Ceramic Coating",
    slug: "ceramic-coating",
    category: "Ceramic Coating",
    shortDescription:
      "Protect your investment with deeper gloss and easier maintenance.",
    fullDescription:
      "Professional ceramic coating with Signature Foam Hand Wash, clay bar decontamination, and surface preparation.",
    features: [
      "Signature Foam Hand Wash",
      "Clay bar treatment and paint decontamination",
      "Surface preparation",
      "Professional ceramic coating application",
    ],
    vehiclePrices: { sedan: 399, midsize: 499, large: 599 },
    startingPrice: 399,
    displayOrder: 20,
    estimatedDuration: "1–2 days",
    customQuote: false,
  },
  {
    name: "Multi-Stage Paint Correction",
    slug: "paint-correction",
    category: "Paint Correction",
    shortDescription: "Restore clarity. Reveal deeper gloss.",
    fullDescription:
      "Multi-stage compounding and polishing with clay bar decontamination and 6-month ceramic sealant protection.",
    features: [
      "Signature Foam Hand Wash",
      "Clay bar treatment and paint decontamination",
      "Multi-stage machine compounding and polishing",
      "6-month ceramic sealant protection",
    ],
    vehiclePrices: { sedan: 399, midsize: 499, large: 599 },
    startingPrice: 399,
    displayOrder: 21,
    estimatedDuration: "1–2 days",
    customQuote: false,
  },
  {
    name: "Headlight Restoration",
    slug: "headlight-restoration",
    category: "Exterior Services",
    shortDescription: "Restore clarity. Improve your vehicle’s appearance.",
    fullDescription:
      "Removes cloudy, yellowed oxidation to improve headlight clarity. $69 per pair.",
    features: [
      "Polishing and protective treatment for both headlights",
    ],
    vehiclePrices: { sedan: 69, midsize: 69, large: 69 },
    startingPrice: 69,
    displayOrder: 22,
    estimatedDuration: "1 hour",
    customQuote: false,
  },
  {
    name: "Engine Bay Detail",
    slug: "engine-bay-detail",
    category: "Exterior Services",
    shortDescription: "A clean finish under the hood.",
    fullDescription:
      "Deep cleaning and dressing of accessible engine-bay surfaces.",
    features: [
      "Degreasing and deep cleaning",
      "Plastic and rubber dressing",
    ],
    vehiclePrices: { sedan: 79, midsize: 79, large: 79 },
    startingPrice: 79,
    displayOrder: 23,
    estimatedDuration: "1–2 hours",
    customQuote: false,
  },
];

export const seedAddOns = [
  {
    name: "Leather Seat Cleaning, Conditioning & Protection + Carpet Shampoo & Extraction",
    slug: "leather-and-carpet-deep-clean",
    section: "interior" as const,
    description:
      "Deep-cleans leather seating to remove dirt, body oils, grime, and buildup, then conditions and protects the leather. Carpeted areas are also shampooed and extracted to remove dirt, staining, spills, and embedded buildup. Leather is finished with conditioning and UV protection.",
    pricingType: "starting" as const,
    fixedPrice: 129,
    displayOrder: 1,
  },
  {
    name: "Fabric Seat & Carpet Shampoo and Extraction",
    slug: "fabric-seat-carpet-shampoo",
    section: "interior" as const,
    description:
      "Deep-cleans fabric seating and carpets using shampooing and extraction to remove dirt, spills, staining, and embedded buildup. Final pricing is based on the condition of the interior and severity of staining.",
    pricingType: "starting" as const,
    fixedPrice: 149,
    displayOrder: 2,
  },
  {
    name: "Interior Plastic & Trim Restoration",
    slug: "interior-plastic-trim-restoration",
    section: "interior" as const,
    description:
      "Restores faded, dull, and worn interior plastics, including door panels, dashboard surfaces, center console, glove compartment, kick panels, pillars, and other trim for a darker, cleaner, refreshed appearance. Durability: up to 6 months.",
    pricingType: "starting" as const,
    fixedPrice: 79,
    displayOrder: 3,
  },
  {
    name: "Interior Ceramic Protection",
    slug: "interior-ceramic-protection",
    section: "interior" as const,
    description:
      "Adds a protective barrier to leather, vinyl, and interior plastics to help resist spills, stains, body oils, heat, sunlight, and everyday buildup while making routine cleaning easier. Protection: up to 6 months.",
    pricingType: "fixed" as const,
    fixedPrice: 39,
    displayOrder: 4,
  },
  {
    name: "Interior Odor Treatment",
    slug: "interior-odor-treatment",
    section: "interior" as const,
    description:
      "Targets and neutralizes unwanted interior odors caused by food, spills, pets, smoke, moisture, and everyday buildup. More severe odors deeply embedded into carpets, fabric, upholstery, or other materials may require a more intensive treatment. Pricing typically ranges from $29–$69 based on severity.",
    pricingType: "starting" as const,
    fixedPrice: 29,
    displayOrder: 5,
  },
  {
    name: "Pet Hair Removal",
    slug: "pet-hair-removal",
    section: "interior" as const,
    description:
      "Removes embedded pet hair from seats, carpets, floor mats, cargo areas, and other interior surfaces. Final pricing is based on the amount of pet hair and how deeply it is embedded into the fabric and carpet fibers.",
    pricingType: "starting" as const,
    fixedPrice: 49,
    serviceSlugs: ["refresh-detail", "restore-detail"],
    displayOrder: 6,
  },
  {
    name: "Exterior Trim Restoration",
    slug: "exterior-trim-restoration",
    section: "exterior" as const,
    description:
      "Restores faded and weathered exterior plastics, including cowl panels, mirror caps, bumper trim, fender trim, windshield and roof moldings, pillar trim, and other exterior plastic surfaces. Durability: up to 6 months.",
    pricingType: "starting" as const,
    fixedPrice: 79,
    displayOrder: 10,
  },
  {
    name: "Headlight Restoration",
    slug: "headlight-restoration",
    section: "exterior" as const,
    description:
      "Removes cloudy, yellowed, and oxidized buildup from headlight lenses to restore a clearer, brighter appearance.",
    pricingType: "starting" as const,
    fixedPrice: 69,
    displayOrder: 11,
  },
  {
    name: "Clay Bar & Paint Decontamination",
    slug: "clay-bar-decontamination",
    section: "exterior" as const,
    description:
      "Removes bonded contaminants such as tar, tree sap, overspray, and rail dust that normal washing leaves behind.",
    pricingType: "vehicle" as const,
    vehiclePrices: { sedan: 59, midsize: 69, large: 79 },
    fixedPrice: 59,
    displayOrder: 12,
  },
  {
    name: "Water Spot Removal & Glass Restoration",
    slug: "water-spot-glass-restoration",
    section: "exterior" as const,
    description:
      "Removes hard-water deposits, mineral buildup, and stubborn spotting from exterior paint and glass. Deeply etched water spots may require paint correction.",
    pricingType: "starting" as const,
    fixedPrice: 89,
    displayOrder: 13,
  },
  {
    name: "Wheel, Tire & Wheel-Well Liner Deep Cleaning",
    slug: "wheel-tire-well-cleaning",
    section: "exterior" as const,
    description:
      "Deep-cleans heavy brake dust, road grime, mud, tire buildup, and embedded dirt from the wheels, tires, and wheel-well liners directly above and behind the tires.",
    pricingType: "starting" as const,
    fixedPrice: 89,
    displayOrder: 14,
  },
  {
    name: "Engine Bay Detail",
    slug: "engine-bay-detail",
    section: "exterior" as const,
    description:
      "Removes dust, dirt, grease, and buildup throughout the engine bay, leaving components and surrounding surfaces clean and refreshed.",
    pricingType: "starting" as const,
    fixedPrice: 79,
    displayOrder: 15,
  },
  {
    name: "Single-Panel Paint Correction",
    slug: "single-panel-paint-correction",
    section: "exterior" as const,
    description:
      "Single-panel correction covers the selected panel — oxidation, swirls, water spots, and light scratches.",
    pricingType: "fixed" as const,
    fixedPrice: 129,
    displayOrder: 16,
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
      "We serve Avondale, Litchfield Park, Goodyear, Buckeye, Waddell, Surprise, Sun City, Glendale, Tolleson, Phoenix, North Phoenix, Cave Creek, Anthem, New River, Paradise Valley, Scottsdale, Fountain Hills, Gilbert, Chandler, Queen Creek, San Tan Valley, and surrounding Valley areas.",
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
      "Vernon showed up on time to my driveway in Goodyear with everything he needed — water, power, the works. The interior looks brand new and the paint has a depth I did not think was possible without a body shop. Already booked my next detail.",
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
      "Kids, dogs, and Arizona dust — the Reset package was exactly what we needed in Litchfield Park. Honest about what was included, super thorough, and the SUV smells and looks incredible. Five stars without hesitation.",
    reviewSource: "seed",
    featured: true,
    approved: true,
    displayOrder: 2,
  },
  {
    customerName: "Chris M.",
    rating: 5,
    vehicle: "Chevy Silverado",
    serviceReceived: "Paint Correction",
    review:
      "Swirls and sun haze were killing my truck in Avondale. They walked me through photos, quoted fairly, and delivered a finish that actually turns heads. Professional from booking to the final wipe-down.",
    reviewSource: "seed",
    featured: true,
    approved: true,
    displayOrder: 3,
  },
  {
    customerName: "Sandra L.",
    rating: 5,
    vehicle: "Mercedes GLE",
    serviceReceived: "Ceramic Coating",
    review:
      "Ceramic coating in Buckeye — water beads like crazy and the gloss is unreal. They explained desert maintenance and were careful on every panel. This is the mobile detailer I recommend to neighbors now.",
    reviewSource: "seed",
    featured: true,
    approved: true,
    displayOrder: 4,
  },
  {
    customerName: "Alejandro V.",
    rating: 5,
    vehicle: "Tesla Model 3",
    serviceReceived: "Refresh Detail",
    review:
      "Refresh detail at my office — huge time saver. Wheels, glass, and interior were flawless. Factory fresh is not marketing talk; that is what I got.",
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
