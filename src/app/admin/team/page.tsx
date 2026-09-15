import { AdminResourceManager } from "@/components/admin/AdminResourceManager";

export default function Page() {
  return (
    <AdminResourceManager
      title="Team"
      endpoint="/api/admin/team"
      fields={[
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "biography", label: "Biography", type: "textarea" },
        { key: "active", label: "Active", type: "checkbox" },
      ]}
    />
  );
}
