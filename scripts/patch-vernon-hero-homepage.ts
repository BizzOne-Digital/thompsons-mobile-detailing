/**
 * Updates home hero supporting line in MongoDB (production admin settings).
 * Run: npx tsx scripts/patch-vernon-hero-homepage.ts
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { BRAND } from "../src/lib/constants";

dotenv.config({ path: ".env.local" });
dotenv.config();

const LEGACY_HERO_DESCRIPTION_PATTERNS = [
  /Professional Mobile Auto Detailing/i,
  /Professional mobile auto detailing/i,
  /Avondale and Across the Phoenix Metro/i,
  /across the Phoenix metro/i,
  /We bring spotless water, power, professional equipment/i,
];

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required");
    process.exit(1);
  }

  await mongoose.connect(uri);
  const { SiteSettings } = await import("../src/models/SiteSettings");

  const doc = await SiteSettings.findOne().lean();
  if (!doc) {
    console.log("No SiteSettings document — defaults from code will apply.");
    await mongoose.disconnect();
    return;
  }

  const current = (doc.heroDescription || "").trim();
  const shouldReplace =
    !current ||
    LEGACY_HERO_DESCRIPTION_PATTERNS.some((re) => re.test(current));

  if (!shouldReplace) {
    console.log(
      "heroDescription left unchanged (already custom):",
      current.slice(0, 80)
    );
    await mongoose.disconnect();
    return;
  }

  await SiteSettings.updateOne(
    { _id: doc._id },
    { $set: { heroDescription: BRAND.heroSupportingLine } }
  );
  console.log("Updated heroDescription to:", BRAND.heroSupportingLine);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
