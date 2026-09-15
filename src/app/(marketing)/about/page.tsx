import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Learn about Thompson's Mobile Detailing AZ — professional mobile auto detailing across the Phoenix Metro.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell
      title="About Thompson's Mobile Detailing AZ"
      subtitle="Professional mobile detailing built on precision, premium products, and factory-fresh results."
    >
      <AboutPageContent />
    </PageShell>
  );
}
