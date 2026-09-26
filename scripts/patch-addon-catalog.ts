/**
 * Upserts the full add-on catalog (pricing, descriptions, sections) without wiping the DB.
 * Run: npx tsx scripts/patch-addon-catalog.ts
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { seedAddOns } from "./seed-data";

dotenv.config({ path: ".env.local" });
dotenv.config();

const LEGACY_ADDON_SLUGS_TO_DISABLE = [
  "engine-bay-cleaning",
  "leather-seat-cleaning",
  "seat-and-carpet-cleaning",
  "six-month-paint-protection",
];

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required");
    process.exit(1);
  }

  await mongoose.connect(uri);
  const { AddOn } = await import("../src/models/AddOn");

  for (const slug of LEGACY_ADDON_SLUGS_TO_DISABLE) {
    await AddOn.updateOne({ slug }, { $set: { active: false } });
  }

  for (const addOn of seedAddOns) {
    const serviceSlugs =
      "serviceSlugs" in addOn && Array.isArray(addOn.serviceSlugs)
        ? addOn.serviceSlugs
        : [];

    await AddOn.findOneAndUpdate(
      { slug: addOn.slug },
      {
        $set: {
          name: addOn.name,
          description: addOn.description,
          pricingType: addOn.pricingType,
          fixedPrice: addOn.fixedPrice,
          vehiclePrices: "vehiclePrices" in addOn ? addOn.vehiclePrices : undefined,
          section: addOn.section,
          serviceSlugs,
          displayOrder: addOn.displayOrder,
          active: true,
        },
      },
      { upsert: true, new: true }
    );
    console.log("Upserted add-on:", addOn.slug);
  }

  console.log("Add-on catalog patch completed.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
