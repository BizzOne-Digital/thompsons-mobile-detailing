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
        { key: "status", label: "Status (draft/published)" },
        { key: "featured", label: "Featured", type: "checkbox" },
      ]}
    />
  );
}
