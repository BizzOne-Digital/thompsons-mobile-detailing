import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";
import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { SITE_IMAGES } from "@/lib/site-images";

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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
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
      <article className="prose prose-invert max-w-3xl whitespace-pre-wrap text-off-white/85">
        {post.content}
      </article>
    </PageShell>
  );
}
