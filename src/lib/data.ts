import { connectDB } from "@/lib/mongodb";
import { DEMO_GALLERY_COMPARISONS } from "@/lib/site-images";
import { SITE_TESTIMONIALS } from "@/lib/site-testimonials";
import { Service } from "@/models/Service";
import { FAQ } from "@/models/FAQ";
import { Testimonial } from "@/models/Testimonial";
import { GalleryItem } from "@/models/GalleryItem";
import { BlogPost } from "@/models/BlogPost";
import { TeamMember } from "@/models/TeamMember";
import { AddOn } from "@/models/AddOn";
import { SiteSettings } from "@/models/SiteSettings";

export async function getPublicServices() {
  try {
    await connectDB();
    return Service.find({ active: true }).sort({ displayOrder: 1 }).lean();
  } catch {
    return [];
  }
}

export async function getPublicFaqs(limit?: number) {
  try {
    await connectDB();
    const q = FAQ.find({ active: true }).sort({ displayOrder: 1 });
    if (limit) q.limit(limit);
    return q.lean();
  } catch {
    return [];
  }
}

export async function getPublicTestimonials(featured?: boolean) {
  try {
    await connectDB();
    const filter: Record<string, unknown> = { approved: true };
    if (featured) filter.featured = true;
    const fromDb = await Testimonial.find(filter)
      .sort({ displayOrder: 1 })
      .lean();
    if (fromDb.length) return fromDb;
  } catch {
    // fall through to built-in reviews
  }
  const fallback = featured
    ? SITE_TESTIMONIALS.filter((t) => t.featured)
    : SITE_TESTIMONIALS;
  return fallback.map((t) => ({ ...t }));
}

export async function getPublicGallery(category?: string) {
  try {
    await connectDB();
    const filter: Record<string, unknown> = { published: true };
    if (category) filter.category = category;
    const items = await GalleryItem.find(filter).sort({ displayOrder: 1 }).lean();
    if (items.length) return items;
  } catch {
    // fall through
  }
  return DEMO_GALLERY_COMPARISONS.map((item) => ({
    ...item,
    published: true,
  }));
}

export async function getPublicPosts() {
  try {
    await connectDB();
    return BlogPost.find({
      status: "published",
      publishedAt: { $lte: new Date() },
    })
      .sort({ publishedAt: -1 })
      .lean();
  } catch {
    return [];
  }
}

export async function getTeam() {
  try {
    await connectDB();
    return TeamMember.find({ active: true }).sort({ displayOrder: 1 }).lean();
  } catch {
    return [];
  }
}

export async function getAddOns() {
  try {
    await connectDB();
    return AddOn.find({ active: true }).sort({ displayOrder: 1 }).lean();
  } catch {
    return [];
  }
}

export async function getSettings() {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne().lean();
    if (!settings) {
      settings = (await SiteSettings.create({})).toObject();
    }
    return settings;
  } catch {
    return null;
  }
}
