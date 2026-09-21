/** Clears admin hero override (wrong Porsche clip). Run: npx tsx scripts/patch-clear-hero-media.ts */
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env.local" });
dotenv.config();

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required");
    process.exit(1);
  }
  await mongoose.connect(uri);
  const { SiteSettings } = await import("../src/models/SiteSettings");
  await SiteSettings.updateOne({}, { $set: { heroMediaUrl: "" } });
  console.log("Cleared heroMediaUrl — site uses coded Charger rinse hero.");
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
