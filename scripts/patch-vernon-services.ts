/**
 * Updates live MongoDB services/add-ons without wiping the database.
 * Run: npx tsx scripts/patch-vernon-services.ts
 */
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env.local" });
dotenv.config();

const PAINT_PROTECTION_FEATURE =
  "6-month paint protection — helps protect against sun damage, oxidation, water spotting, environmental contaminants, and road grime while enhancing gloss and making future washes easier";

const FOAM_FEATURE = "Signature Foam Hand Wash included";

const SIGNATURE_FOAM_PAINT_ADDON =
  "+ 6-Month Paint Protection (optional add-on): Helps protect against sun damage, oxidation, water spotting, environmental contaminants, and road grime while enhancing gloss and making future washes easier.";

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
    { $set: { estimatedDuration: "1.5 to 3 hours" } }
  );

  await Service.updateOne(
    { slug: "restore-detail" },
    {
      $set: {
        startingPrice: 229,
        vehiclePrices: { sedan: 229, midsize: 249, large: 289 },
      },
    }
  );

  const restore = await Service.findOne({ slug: "restore-detail" }).lean();
  if (restore?.features) {
    const features = restore.features.map((f: string) =>
      f.toLowerCase().startsWith("6-month paint protection")
        ? PAINT_PROTECTION_FEATURE
        : f
    );
    if (!features.some((f: string) => f === FOAM_FEATURE)) {
      features.push(FOAM_FEATURE);
    }
    await Service.updateOne({ slug: "restore-detail" }, { $set: { features } });
  }

  const reset = await Service.findOne({ slug: "reset-detail" }).lean();
  if (reset?.features) {
    let features = reset.features.map((f: string) =>
      f.toLowerCase().startsWith("6-month paint protection")
        ? PAINT_PROTECTION_FEATURE
        : f
    );
    if (!features.some((f: string) => f === FOAM_FEATURE)) {
      features = [...features, FOAM_FEATURE];
    }
    await Service.updateOne({ slug: "reset-detail" }, { $set: { features } });
  }

  const foam = await Service.findOne({ slug: "signature-foam-hand-wash" }).lean();
  if (foam?.features) {
    const features = foam.features.filter(
      (f: string) => !f.includes("6-Month Paint Protection")
    );
    features.push(SIGNATURE_FOAM_PAINT_ADDON);
    await Service.updateOne(
      { slug: "signature-foam-hand-wash" },
      { $set: { features } }
    );
  }

  await AddOn.findOneAndUpdate(
    { slug: "six-month-paint-protection" },
    {
      name: "+ 6-Month Paint Protection",
      slug: "six-month-paint-protection",
      description:
        "Helps protect against sun damage, oxidation, water spotting, environmental contaminants, and road grime while enhancing gloss and making future washes easier.",
      pricingType: "vehicle",
      vehiclePrices: { sedan: 49, midsize: 59, large: 69 },
      serviceSlugs: ["signature-foam-hand-wash"],
      active: true,
      displayOrder: 9,
    },
    { upsert: true, new: true }
  );

  console.log("Vernon service/add-on patch applied.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
