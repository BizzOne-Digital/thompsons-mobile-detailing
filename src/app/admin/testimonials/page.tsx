import { AdminResourceManager } from "@/components/admin/AdminResourceManager";

export default function Page() {
  return (
    <AdminResourceManager
      title="Testimonials"
      endpoint="/api/admin/testimonials"
      fields={[
        { key: "customerName", label: "Customer Name" },
        { key: "rating", label: "Rating (1-5)" },
        { key: "review", label: "Review", type: "textarea" },
        { key: "vehicle", label: "Vehicle" },
        { key: "approved", label: "Approved", type: "checkbox" },
        { key: "featured", label: "Featured", type: "checkbox" },
      ]}
    />
  );
}
