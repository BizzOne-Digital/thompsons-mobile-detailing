import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getPublicPosts } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { SITE_IMAGES } from "@/lib/site-images";
import { getSiteUrl } from "@/lib/site-url";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Mobile auto detailing tips, Arizona vehicle care guides, and expert advice from Thompson's Mobile Detailing AZ across the Phoenix metro.",
  path: "/blog",
});
export const dynamic = "force-dynamic";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const posts = await getPublicPosts();
  const filtered = q
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(q.toLowerCase()) ||
          (p.tags ?? []).some((t: string) =>
            t.toLowerCase().includes(q.toLowerCase())
          )
      )
    : posts;

  const blogJsonLd =
    filtered.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Thompson's Mobile Detailing Blog",
          description:
            "Tips, guides, and Arizona vehicle care insights from Thompson's Mobile Detailing AZ.",
          blogPost: filtered.slice(0, 10).map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            url: `${getSiteUrl()}/blog/${post.slug}`,
            datePublished: post.publishedAt,
          })),
        }
      : null;

  return (
    <PageShell
      title="Detailing Blog"
      subtitle="Tips, guides, and Arizona vehicle care insights — from mobile detailing pros who serve the Valley daily."
      heroImage={SITE_IMAGES.paintCorrection}
      eyebrow="Tips & insights"
    >
      {blogJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
      )}
      <form className="mb-10" role="search">
        <label htmlFor="blog-search" className="sr-only">
          Search articles
        </label>
        <input
          id="blog-search"
          name="q"
          defaultValue={q}
          placeholder="Search articles (e.g. ceramic, interior, Arizona)"
          className="w-full max-w-md rounded-xl border border-gold/30 bg-midnight px-4 py-3 text-off-white placeholder:text-off-white/40 focus:border-bright-gold focus:outline-none focus:ring-1 focus:ring-bright-gold/40"
        />
      </form>

      {filtered.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2">
          {filtered.map((post) => (
            <BlogPostCard
              key={String(post._id)}
              post={{
                _id: String(post._id),
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                readingTime: post.readingTime,
                publishedAt: post.publishedAt,
                featuredImage: post.featuredImage,
                featured: post.featured,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel max-w-2xl rounded-2xl border border-gold/20 p-8 text-center md:p-10">
          <p className="font-display text-xl text-off-white">
            New articles coming soon
          </p>
          <p className="mt-3 text-sm leading-relaxed text-off-white/70">
            We&apos;re preparing helpful guides on mobile detailing, Arizona
            climate care, and keeping your vehicle factory-fresh. Check back
            shortly — or{" "}
            <Link href="/contact" className="text-bright-gold hover:underline">
              contact us
            </Link>{" "}
            if you have a topic you&apos;d like covered.
          </p>
          <Link
            href="/booking"
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-gold via-bright-gold to-soft-gold px-6 py-3 text-sm font-semibold text-midnight"
          >
            Book a detail
          </Link>
        </div>
      )}
    </PageShell>
  );
}
