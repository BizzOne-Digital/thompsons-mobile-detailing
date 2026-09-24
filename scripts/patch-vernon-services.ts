/**
 * Updates live MongoDB services/add-ons without wiping the database.
 * Run: npx tsx scripts/patch-vernon-services.ts
 */
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env.local" });
dotenv.config();

const FOAM_INCLUDED = "Signature Foam Hand Wash included";

const PAINT_PROTECTION_INCLUDED =
  "Includes 6-Month Paint Protection: Helps protect against sun damage, oxidation, water spotting, environmental contaminants, and road grime while enhancing gloss and making future washes easier";

const SIGNATURE_FOAM_FEATURES = [
  PAINT_PROTECTION_INCLUDED,
  "Safe hand wash process",
  "Wheel and tire cleaning",
  "Door jambs wiped",
  "Streak-free glass",
  "Premium finish dry",
];

const SIGNATURE_FOAM_FULL_DESCRIPTION =
  "Professional Signature Foam Hand Wash designed to safely remove dirt, road film, bug residue, and surface contaminants. Includes 6-month paint protection to help protect against sun damage, oxidation, water spotting, environmental contaminants, and road grime while enhancing gloss and making future washes easier.";

const REFRESH_FEATURES = [
  "Complete interior vacuuming of seats, underneath seats, carpets, floor mats, and cargo or trunk area",
  "Dashboard, center console, cupholders, door panels, and steering wheel cleaned",
  "Air vents cleaned and refreshed",
  "Door jambs cleaned and detailed",
  "Interior glass cleaned streak-free",
  "Light interior dressing and protection",
  "Final quality inspection",
  FOAM_INCLUDED,
];

const RESTORE_FEATURES = [
  "Everything in Refresh Detail",
  "Deep shampoo and extraction of carpets, floor mats, and fabric seats",
  "Leather seats cleaned and conditioned where applicable",
  "Headliner spot-stain treatment",
  "Hard plastics cleaned, conditioned, and protected",
  FOAM_INCLUDED,
];

const RESET_FEATURES = [
  "Everything in Restore Detail",
  "Intensive shampoo and hot-water extraction",
  "Heavy pet hair removal",
  "Interior odor treatment",
  "Full headliner deep cleaning and restoration",
  "Exterior trim restoration for faded plastics",
  FOAM_INCLUDED,
];

const RESTORE_FULL_DESCRIPTION =
  "Designed for vehicles that need more than routine maintenance due to visible buildup, stains, spills, embedded dirt, carpet discoloration, and interior surfaces that have started to look worn or neglected. Includes everything in Refresh Detail, plus deep shampoo and extraction, leather conditioning, and headliner spot treatment.";

const RECURRING_MAINTENANCE = {
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
  active: true,
  customQuote: false,
  images: [] as string[],
  exclusions: [] as string[],
};

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required");
    process.exit(1);
  }

  await mongoose.connect(uri);
  const { Service } = await import("../src/models/Service");
  const { AddOn } = await import("../src/models/AddOn");

  await Service.updateOne(
    { slug: "refresh-detail" },
    {
      $set: {
        estimatedDuration: "1.5 to 3 hours",
        features: REFRESH_FEATURES,
      },
    }
  );

  await Service.updateOne(
    { slug: "restore-detail" },
    {
      $set: {
        startingPrice: 229,
        vehiclePrices: { sedan: 229, midsize: 249, large: 289 },
        fullDescription: RESTORE_FULL_DESCRIPTION,
        features: RESTORE_FEATURES,
      },
    }
  );

  await Service.updateOne(
    { slug: "reset-detail" },
    { $set: { features: RESET_FEATURES } }
  );

  await Service.updateOne(
    { slug: "signature-foam-hand-wash" },
    {
      $set: {
        fullDescription: SIGNATURE_FOAM_FULL_DESCRIPTION,
        features: SIGNATURE_FOAM_FEATURES,
        startingPrice: 99,
        vehiclePrices: { sedan: 99, midsize: 129, large: 149 },
      },
    }
  );

  await Service.findOneAndUpdate(
    { slug: RECURRING_MAINTENANCE.slug },
    { $set: RECURRING_MAINTENANCE },
    { upsert: true }
  );

  await AddOn.updateOne(
    { slug: "six-month-paint-protection" },
    { $set: { active: false } }
  );

  console.log("Vernon service/add-on patch applied.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
