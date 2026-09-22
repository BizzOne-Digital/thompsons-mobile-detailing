import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";
import { Service } from "@/models/Service";
import { SERVICE_AREA_PAGES, serviceAreaPath } from "@/lib/service-areas";
import { getSiteUrl } from "@/lib/site-url";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/areas",
  "/pricing",
  "/results",
  "/testimonials",
  "/faq",
  "/blog",
  "/booking",
  "/contact",
  "/team",
  "/privacy-policy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/areas" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/areas" ? 0.85 : 0.7,
  }));

  for (const area of SERVICE_AREA_PAGES) {
    entries.push({
      url: `${base}${serviceAreaPath(area.slug)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  try {
    await connectDB();
    const services = await Service.find({ active: true })
      .select("slug updatedAt")
      .lean();
    for (const service of services) {
      entries.push({
        url: `${base}/services/${service.slug}`,
        lastModified: service.updatedAt ? new Date(service.updatedAt) : now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    const posts = await BlogPost.find({ status: "published" })
      .select("slug updatedAt publishedAt")
      .lean();
    for (const post of posts) {
      entries.push({
        url: `${base}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt ?? post.publishedAt ?? now),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {
    // Static + area URLs still published if DB is unreachable at build/runtime
  }

  return entries;
}
