import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { ResultsGalleryView } from "@/components/results/ResultsGalleryView";

export const metadata = buildMetadata({
  title: "Detailing Results & Gallery",
  description:
    "Before-and-after transformations and professional mobile detailing photos from Thompson's Mobile Detailing AZ.",
  path: "/results",
});

export default function ResultsPage() {
  return (
    <PageShell
      title="Detailing Results"
      subtitle="Real before-and-after work and finished details from mobile appointments across the Valley."
    >
      <ResultsGalleryView />
    </PageShell>
  );
}
