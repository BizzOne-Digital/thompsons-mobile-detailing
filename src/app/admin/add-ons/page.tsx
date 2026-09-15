import { AdminResourceManager } from "@/components/admin/AdminResourceManager";

export default function Page() {
  return (
    <AdminResourceManager
      title="Add-Ons"
      endpoint="/api/admin/add-ons"
      fields={[
        { key: "name", label: "Name" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "fixedPrice", label: "Price" },
        { key: "active", label: "Active", type: "checkbox" },
      ]}
    />
  );
}
