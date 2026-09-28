/**
 * Upsert blog posts from content/blog-posts.json into MongoDB.
 * Run: npm run import-blogs
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { readFileSync } from "fs";
import { join } from "path";
import { connectDB } from "../src/lib/mongodb";
import { slugify, readingTimeMinutes } from "../src/lib/utils";
import { BlogPost } from "../src/models/BlogPost";

type ImportPost = {
  title: string;
  slug?: string;
  excerpt: string;
  content?: string;
  /** Load body from content/<path> (e.g. posts/article.md) */
  contentFile?: string;
  status?: "draft" | "published" | "scheduled";
  publishedAt?: string;
  featured?: boolean;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: { url: string; alt?: string; publicId?: string };
};

async function main() {
  const filePath = join(process.cwd(), "content", "blog-posts.json");
  const raw = readFileSync(filePath, "utf8");
  const posts = JSON.parse(raw) as ImportPost[];

  if (!Array.isArray(posts) || posts.length === 0) {
    console.log("No posts in content/blog-posts.json — add entries and run again.");
    process.exit(0);
  }

  await connectDB();

  for (const item of posts) {
    let content = item.content?.trim() ?? "";
    if (item.contentFile) {
      content = readFileSync(
        join(process.cwd(), "content", item.contentFile),
        "utf8"
      ).trim();
    }
    if (!item.title?.trim() || !item.excerpt?.trim() || !content) {
      console.warn("Skipping incomplete post (need title, excerpt, content):", item.title);
      continue;
    }

    const slug = (item.slug || slugify(item.title)).trim();
    const status = item.status ?? "published";
    const publishedAt =
      item.publishedAt != null ? new Date(item.publishedAt) : new Date();

    const doc = {
      title: item.title.trim(),
      slug,
      excerpt: item.excerpt.trim(),
      content,
      status,
      publishedAt,
      featured: item.featured ?? false,
      tags: item.tags ?? [],
      seoTitle: item.seoTitle?.trim(),
      seoDescription: item.seoDescription?.trim(),
      featuredImage: item.featuredImage,
      readingTime: readingTimeMinutes(content),
    };

    const updated = await BlogPost.findOneAndUpdate({ slug }, doc, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });

    console.log(`✓ ${updated.slug} (${updated.status})`);
  }

  console.log("Done.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
