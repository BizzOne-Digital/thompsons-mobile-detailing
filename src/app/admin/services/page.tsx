import { AdminResourceManager } from "@/components/admin/AdminResourceManager";

export default function Page() {
  return (
    <AdminResourceManager
      title="Services"
      endpoint="/api/admin/services"
      fields={[
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug" },
        { key: "category", label: "Category" },
        { key: "shortDescription", label: "Short Description", type: "textarea" },
        { key: "fullDescription", label: "Full Description", type: "textarea" },
        { key: "startingPrice", label: "Starting Price" },
        { key: "active", label: "Active", type: "checkbox" },
        { key: "featured", label: "Featured", type: "checkbox" },
      ]}
    />
  );
}
