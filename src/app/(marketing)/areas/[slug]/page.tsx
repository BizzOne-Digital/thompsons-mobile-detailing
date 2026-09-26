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
import { getPublicServices } from "@/lib/data";

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
    title: area.headline,
    description: area.description,
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

  const services = await getPublicServices();
  const serviceLinks = services.map((s) => ({
    slug: s.slug,
    name: s.name,
  }));

  const base = getSiteUrl();
  const pageUrl = `${base}${serviceAreaPath(area.slug)}`;
  const jsonLd = {
    ...localBusinessJsonLd(),
    "@type": "AutoDetailing",
    url: pageUrl,
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: { "@type": "State", name: "Arizona" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageShell title={area.headline} subtitle={area.description}>
        <AreaDetailContent area={area} services={serviceLinks} />
      </PageShell>
    </>
  );
}
