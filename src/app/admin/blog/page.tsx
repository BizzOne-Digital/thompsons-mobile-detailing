import { AdminResourceManager } from "@/components/admin/AdminResourceManager";

export default function Page() {
  return (
    <AdminResourceManager
      title="Blog Posts"
      endpoint="/api/admin/blog"
      fields={[
        { key: "title", label: "Title" },
        { key: "slug", label: "Slug" },
        { key: "excerpt", label: "Excerpt", type: "textarea" },
        { key: "content", label: "Content", type: "textarea" },
        { key: "status", label: "Status (draft/published/scheduled)" },
        { key: "publishedAt", label: "Published at (ISO date, e.g. 2026-03-23)" },
        { key: "seoTitle", label: "SEO title" },
        { key: "seoDescription", label: "SEO description", type: "textarea" },
        { key: "featured", label: "Featured", type: "checkbox" },
      ]}
    />
  );
}
