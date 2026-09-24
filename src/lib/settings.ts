import { connectDB } from "@/lib/mongodb";
import { SiteSettings } from "@/models/SiteSettings";

export async function getSiteSettings() {
  const conn = await connectDB();
  if (!conn) return null;
  let settings = await SiteSettings.findOne().lean();
  if (!settings) {
    const created = await SiteSettings.create({});
    settings = created.toObject();
  }
  return settings;
}
