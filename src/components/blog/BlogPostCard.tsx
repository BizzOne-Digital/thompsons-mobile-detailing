import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SITE_IMAGES } from "@/lib/site-images";

export type BlogPostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  readingTime: number;
  publishedAt?: Date | string;
  featuredImage?: { url: string; alt?: string };
  featured?: boolean;
};

function formatPublishedDate(value: Date | string | undefined) {
  if (!value) return null;
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogPostCard({ post }: { post: BlogPostListItem }) {
  const dateLabel = formatPublishedDate(post.publishedAt);
  const imageUrl = post.featuredImage?.url ?? SITE_IMAGES.paintCorrection;
  const imageAlt =
    post.featuredImage?.alt ?? `${post.title} — Thompson's Mobile Detailing`;

  return (
    <article className="group glass-panel flex h-full flex-col overflow-hidden rounded-2xl border border-gold/15">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/20 to-transparent" />
        {post.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-gold/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-midnight">
            Featured
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-off-white/50">
          {dateLabel && <time dateTime={String(post.publishedAt)}>{dateLabel}</time>}
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {post.readingTime} min read
          </span>
        </div>
        <h2 className="mt-3 font-display text-xl text-off-white transition group-hover:text-bright-gold md:text-2xl">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-off-white/75">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-bright-gold hover:text-soft-gold"
        >
          Read article
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
