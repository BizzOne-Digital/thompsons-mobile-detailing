import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { ResultsGalleryView } from "@/components/results/ResultsGalleryView";
import { getPublicGallery } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Detailing Results & Gallery",
  description:
    "Before-and-after transformations and professional mobile detailing photos from Thompson's Mobile Detailing AZ.",
  path: "/results",
});

export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  const managedGallery = await getPublicGallery();
  const fromDb = managedGallery.filter(
    (item) => item._id && !String(item._id).startsWith("demo-")
  );

  return (
    <PageShell
      title="Detailing Results"
      subtitle="Real before-and-after work and finished details from mobile appointments across the Valley."
    >
      <ResultsGalleryView
        managedGallery={fromDb.map((item) => ({
          _id: String(item._id),
          title: item.title,
          category: item.category,
          beforeImage: item.beforeImage,
          afterImage: item.afterImage,
          caption: item.caption,
        }))}
      />
    </PageShell>
  );
}
