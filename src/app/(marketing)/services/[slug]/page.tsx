import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { buildServiceGallery } from "@/lib/service-gallery";
import { SERVICE_SLUG_IMAGES, SITE_IMAGES } from "@/lib/site-images";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();
  const service = await Service.findOne({ slug, active: true }).lean();
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle || service.name,
    description: service.seoDescription || service.shortDescription,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();
  const service = await Service.findOne({ slug, active: true }).lean();
  if (!service) notFound();

  const related = await Service.find({
    active: true,
    category: service.category,
    slug: { $ne: service.slug },
  })
    .sort({ displayOrder: 1 })
    .limit(3)
    .lean();

  const cover =
    SERVICE_SLUG_IMAGES[service.slug] ?? SITE_IMAGES.mobileSunsetSedan;

  const galleryImages = buildServiceGallery(
    service.slug,
    service.name,
    cover,
    service.images ?? []
  );

  return (
    <PageShell
      title={service.name}
      subtitle={service.shortDescription}
      heroImage={cover}
      eyebrow="Service detail"
    >
      <ServiceDetailView
        galleryImages={galleryImages}
        service={{
          _id: String(service._id),
          name: service.name,
          slug: service.slug,
          category: service.category,
          shortDescription: service.shortDescription,
          fullDescription: service.fullDescription,
          features: service.features ?? [],
          exclusions: service.exclusions ?? [],
          startingPrice: service.startingPrice,
          customQuote: service.customQuote ?? false,
          estimatedDuration: service.estimatedDuration,
          vehiclePrices: service.vehiclePrices,
        }}
        relatedServices={related.map((r) => ({
          slug: r.slug,
          name: r.name,
          shortDescription: r.shortDescription,
          startingPrice: r.startingPrice,
          customQuote: r.customQuote,
        }))}
      />
    </PageShell>
  );
}
