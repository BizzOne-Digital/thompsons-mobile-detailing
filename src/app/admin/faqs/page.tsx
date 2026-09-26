import { AdminResourceManager } from "@/components/admin/AdminResourceManager";

export default function Page() {
  return (
    <AdminResourceManager
      title="FAQs"
      endpoint="/api/admin/faqs"
      fields={[
        { key: "question", label: "Question" },
        { key: "answer", label: "Answer", type: "textarea" },
        { key: "displayOrder", label: "Display Order" },
        { key: "active", label: "Active", type: "checkbox" },
      ]}
    />
  );
}
