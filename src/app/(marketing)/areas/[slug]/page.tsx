import { notFound } from "next/navigation";
import { buildMetadata, localBusinessJsonLd } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { PageShell } from "@/components/layout/PageShell";
import { AreaDetailContent } from "@/components/areas/AreaDetailContent";
import {
  SERVICE_AREA_PAGES,
  getServiceAreaBySlug,
  serviceAreaPath,
} from "@/lib/service-areas";

export function generateStaticParams() {
  return SERVICE_AREA_PAGES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) return {};
  return buildMetadata({
    title: area.copy.metaTitle,
    description: area.copy.metaDescription,
    path: serviceAreaPath(area.slug),
  });
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) notFound();

  const base = getSiteUrl();
  const pageUrl = `${base}${serviceAreaPath(area.slug)}`;
  const jsonLd = {
    ...localBusinessJsonLd({ pageUrl }),
    description: area.copy.metaDescription,
    areaServed: {
      "@type": "City",
      name: `${area.name}, AZ`,
      containedInPlace: { "@type": "State", name: "Arizona" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageShell
        title={area.copy.h1}
        subtitle={area.copy.heroSubtitle}
        heroImage={area.heroImage}
        eyebrow={`${area.name}, Arizona`}
      >
        <AreaDetailContent area={area} />
      </PageShell>
    </>
  );
}
