import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/services",
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

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
