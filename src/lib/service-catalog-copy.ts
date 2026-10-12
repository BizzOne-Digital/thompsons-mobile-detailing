/**
 * Client-approved service names, taglines (under title), and detail-page content.
 * Overrides Mongo text on marketing surfaces when defined.
 */

export type ServiceCatalogEntry = {
  name?: string;
  tagline: string;
  overview: string;
  features: string[];
  notes?: string[];
};

export const SERVICE_CATALOG: Record<string, ServiceCatalogEntry> = {
  "signature-foam-hand-wash": {
    name: "Signature Foam Hand Wash + Clay Bar Treatment",
    tagline:
      "Includes Tire & Wheel Deep Cleaning + Tire Shine — protect your investment. Keep your vehicle clean, glossy, and protected year-round.",
    overview:
      "Professional exterior hand wash with clay bar decontamination, tire and wheel deep cleaning, 6-month ceramic sealant, and tire shine — one complete exterior refresh.",
    features: [
      "Pre-rinse to loosen dirt and road grime",
      "Bug splatter, tree sap, and tar removal",
      "Foam cannon application and careful hand washing",
      "Tires and wheels deep cleaned",
      "Clay bar treatment to remove bonded contaminants that washing leaves behind, creating a smoother paint finish",
      "Final rinse after clay bar treatment",
      "Exterior glass cleaned and vehicle hand dried",
      "6-month ceramic sealant applied",
      "Tire shine applied",
    ],
    notes: [
      "The ceramic sealant enhances gloss, promotes water beading, and makes routine washing and maintenance easier. It adds a protective barrier against road grime, bird droppings, and other environmental contaminants. Contaminants should still be removed promptly.",
      "Clay bar treatment is included in this standalone service and should not be charged again as an add-on. It is not automatically included in the full-detail packages.",
    ],
  },
  "recurring-maintenance-wash": {
    name: "Recurring Customer Maintenance Wash",
    tagline:
      "Keep your vehicle clean, glossy, and protected between full details.",
    overview:
      "For returning customers maintaining their vehicle every 3–6 weeks. Includes pre-rinse, foam and hand wash, routine wheel and tire cleaning, exterior glass cleaning, hand drying, sealant refreshment, and tire shine.",
    features: [
      "Pre-rinse, foam application, and hand wash",
      "Routine wheel and tire cleaning",
      "Exterior glass cleaning and hand drying",
      "Sealant refreshment",
      "Tire shine applied",
    ],
    notes: [
      "Clay bar treatment and a fresh 6-month ceramic sealant application are priced separately when needed.",
    ],
  },
  "monthly-maintenance-membership": {
    name: "Monthly Interior & Exterior Maintenance Membership",
    tagline:
      "Keep your vehicle fresh inside and glossy outside.",
    overview:
      "For returning customers maintaining their vehicle every 3–6 weeks after an initial detail appropriate to its condition. Regular upkeep helps prevent dirt and grime from accumulating and keeps the interior and exterior looking clean between full details.",
    features: [
      "Interior vacuuming of seats, carpets, floor mats, and trunk/cargo area",
      "Light cleaning of dashboard, center console, cupholders, and door panels",
      "Interior glass cleaning",
      "Exterior pre-rinse, foam application, and hand wash",
      "Routine wheel and tire cleaning",
      "Exterior glass cleaning and hand drying",
      "Sealant refreshment",
      "Tire shine applied",
    ],
    notes: [
      "Extraction, heavy stain treatment, excessive pet hair removal, clay bar treatment, and a fresh 6-month ceramic sealant application are priced separately when needed.",
    ],
  },
  "paint-correction": {
    name: "Multi-Stage Paint Correction",
    tagline: "Restore clarity. Reveal deeper gloss.",
    overview:
      "Compounding and polishing remove or reduce swirl marks, light surface scratches, oxidation, haze, and water spots. Improves paint clarity, color depth, and reflective gloss.",
    features: [
      "Signature Foam Hand Wash",
      "Clay bar treatment and paint decontamination",
      "Surface preparation",
      "Multi-stage machine compounding and polishing",
      "6-month ceramic sealant protection",
    ],
    notes: [
      "Single-panel correction covers the selected panel. Full-vehicle correction covers all painted panels. Ceramic coating is priced separately.",
    ],
  },
  "ceramic-coating": {
    name: "5-Year Professional Ceramic Coating",
    tagline:
      "Protect your investment with deeper gloss and easier maintenance.",
    overview:
      "Forms a durable protective layer over your paint that enhances gloss, enriches color depth, and promotes water beading. Helps protect against UV exposure and environmental contaminants, including bird droppings, tree sap, and road grime.",
    features: [
      "Signature Foam Hand Wash",
      "Clay bar treatment and paint decontamination",
      "Surface preparation",
      "Professional ceramic coating application",
    ],
    notes: [
      "Provides up to 5 years of protection with proper care and regular maintenance. Contaminants should still be removed promptly. Paint correction is priced separately.",
    ],
  },
  "clay-bar-decontamination": {
    name: "Clay Bar & Paint Decontamination Add-On",
    tagline: "Smoother paint. A cleaner foundation for protection.",
    overview:
      "Removes bonded contaminants such as tar, tree sap, overspray, and rail dust that normal washing leaves behind. Creates a smoother surface before paint protection or polishing.",
    features: [
      "Targeted decontamination of painted surfaces",
      "Removes bonded tar, sap, overspray, and rail dust",
      "Prepares paint for sealant, polish, or coating",
    ],
    notes: [
      "Do not charge this add-on for services that already include clay bar treatment or decontamination.",
    ],
  },
  "interior-ceramic-protection": {
    name: "Interior Ceramic Protection",
    tagline: "Protect interior surfaces. Make everyday cleaning easier.",
    overview:
      "Applied to cleaned, compatible leather, vinyl, and interior plastics to help resist spills, stains, body oils, and everyday buildup.",
    features: [
      "Protective barrier on leather, vinyl, and compatible plastics",
      "Helps resist spills, stains, and body oils",
      "Makes surfaces easier to wipe clean and maintain",
    ],
  },
  "headlight-restoration": {
    name: "Headlight Restoration",
    tagline: "Restore clarity. Improve your vehicle’s appearance.",
    overview:
      "Removes cloudy, yellowed oxidation to improve headlight clarity and help light pass through the lenses more effectively.",
    features: [
      "Polishing and protective treatment for both headlights",
      "Improves clarity and appearance of oxidized lenses",
    ],
  },
  "engine-bay-detail": {
    name: "Engine Bay Detail",
    tagline: "A clean finish under the hood.",
    overview:
      "Deep cleaning removes dirt, dust, grease, and stubborn grime from accessible engine-bay surfaces.",
    features: [
      "Degreasing and deep cleaning of accessible surfaces",
      "Plastic and rubber components dressed for a refreshed finish",
    ],
  },
};

export function getServiceCatalogEntry(
  slug: string
): ServiceCatalogEntry | undefined {
  return SERVICE_CATALOG[slug];
}

export function getServiceDisplayName(slug: string, fallback: string): string {
  return SERVICE_CATALOG[slug]?.name ?? fallback;
}

export function getServiceTagline(slug: string, fallback: string): string {
  return SERVICE_CATALOG[slug]?.tagline ?? fallback;
}

/** Brand title colors — alternate by list index */
export const SERVICE_TITLE_COLOR_CLASSES = [
  "text-[#E53935]", // brand red
  "text-[#1E4FD6]", // royal blue
  "text-bright-gold",
] as const;

export function serviceTitleColorClass(index: number): string {
  return SERVICE_TITLE_COLOR_CLASSES[index % SERVICE_TITLE_COLOR_CLASSES.length];
}
