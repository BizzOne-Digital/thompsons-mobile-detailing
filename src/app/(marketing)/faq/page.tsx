import { buildMetadata } from "@/lib/seo";
import { getPublicFaqs } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";
import { FaqAccordion } from "@/components/faq/FaqAccordion";

export const metadata = buildMetadata({ title: "FAQ", path: "/faq" });
export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const faqs = await getPublicFaqs();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <PageShell
      title="Frequently Asked Questions"
      subtitle="Booking, pricing, mobile service area, and what to expect — answered in one place."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqAccordion
        items={faqs.map((f) => ({
          _id: String(f._id),
          question: f.question,
          answer: f.answer,
        }))}
      />
    </PageShell>
  );
}
