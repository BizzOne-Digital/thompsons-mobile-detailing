import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { PageShell } from "@/components/layout/PageShell";
import { BlogArticleBody } from "@/components/blog/BlogArticleBody";
import { SITE_IMAGES } from "@/lib/site-images";
import { ArrowLeft, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();
  const post = await BlogPost.findOne({
    slug,
    status: "published",
    publishedAt: { $lte: new Date() },
  }).lean();
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${slug}`,
  });
}

function formatPublishedDate(value: Date | undefined) {
  if (!value) return null;
  return value.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();
  const post = await BlogPost.findOne({
    slug,
    status: "published",
    publishedAt: { $lte: new Date() },
  }).lean();
  if (!post) notFound();

  const dateLabel = formatPublishedDate(post.publishedAt);
  const base = getSiteUrl();
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: "Thompson's Mobile Detailing AZ",
    },
    publisher: {
      "@type": "Organization",
      name: "Thompson's Mobile Detailing AZ",
    },
    mainEntityOfPage: `${base}/blog/${slug}`,
  };

  return (
    <PageShell
      title={post.title}
      subtitle={post.excerpt}
      heroImage={post.featuredImage?.url ?? SITE_IMAGES.ceramicCoating}
      eyebrow="Article"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-off-white/55">
        {dateLabel && (
          <time dateTime={post.publishedAt?.toISOString()}>{dateLabel}</time>
        )}
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" aria-hidden />
          {post.readingTime} min read
        </span>
      </div>
      <BlogArticleBody content={post.content} />
      <div className="mt-12 flex flex-col gap-4 border-t border-gold/20 pt-10 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-bright-gold hover:text-soft-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all articles
        </Link>
        <Link
          href="/booking"
          className="inline-flex justify-center rounded-full bg-gradient-to-r from-gold via-bright-gold to-soft-gold px-6 py-3 text-sm font-semibold text-midnight"
        >
          Book your detail
        </Link>
      </div>
    </PageShell>
  );
}
