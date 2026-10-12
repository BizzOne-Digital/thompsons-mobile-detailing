/**
 * Applies Vernon Mar 2026 pricing + service catalog to live MongoDB.
 * Run: npx tsx scripts/patch-vernon-pricing-mar2026.ts
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { seedAddOns, seedServices } from "./seed-data";
import { SERVICE_CATALOG } from "../src/lib/service-catalog-copy";

dotenv.config({ path: ".env.local" });
dotenv.config();

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required");
    process.exit(1);
  }

  await mongoose.connect(uri);
  const { Service } = await import("../src/models/Service");
  const { AddOn } = await import("../src/models/AddOn");

  for (const s of seedServices) {
    const catalog = SERVICE_CATALOG[s.slug];
    const $set: Record<string, unknown> = {
      name: catalog?.name ?? s.name,
      shortDescription: catalog?.tagline ?? s.shortDescription,
      fullDescription: catalog?.overview ?? s.fullDescription,
      features: catalog?.features?.length ? catalog.features : s.features,
      vehiclePrices: s.vehiclePrices,
      startingPrice: s.startingPrice,
      estimatedDuration: s.estimatedDuration,
      category: s.category,
      displayOrder: s.displayOrder,
      active: true,
    };
    if ("customQuote" in s) {
      $set.customQuote = s.customQuote;
    } else {
      $set.customQuote = false;
    }
    await Service.findOneAndUpdate({ slug: s.slug }, { $set }, { upsert: true });
  }

  for (const a of seedAddOns) {
    await AddOn.updateOne(
      { slug: a.slug },
      {
        $set: {
          name: a.name,
          description: a.description,
          pricingType: a.pricingType,
          fixedPrice: a.fixedPrice,
          vehiclePrices: (a as { vehiclePrices?: object }).vehiclePrices,
          section: a.section,
          displayOrder: a.displayOrder,
          serviceSlugs: (a as { serviceSlugs?: string[] }).serviceSlugs ?? [],
          active: true,
        },
      },
      { upsert: true }
    );
  }

  console.log("Vernon Mar 2026 pricing patch applied.");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
