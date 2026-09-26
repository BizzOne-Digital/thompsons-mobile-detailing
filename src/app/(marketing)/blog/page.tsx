import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getPublicPosts } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";

export const metadata = buildMetadata({ title: "Blog", path: "/blog" });
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
          p.excerpt.toLowerCase().includes(q.toLowerCase())
      )
    : posts;

  return (
    <PageShell title="Detailing Blog" subtitle="Tips, guides, and Arizona vehicle care insights.">
      <form className="mb-8">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search articles"
          className="w-full max-w-md rounded-xl border border-gold/30 bg-midnight px-4 py-3"
        />
      </form>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((post) => (
          <article key={String(post._id)} className="glass-panel rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-bright-gold">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mt-2 text-sm text-off-white/75">{post.excerpt}</p>
            <p className="mt-4 text-xs text-off-white/50">
              {post.readingTime} min read
            </p>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-off-white/70">No published posts yet. Create posts in the admin portal.</p>
      )}
    </PageShell>
  );
}
