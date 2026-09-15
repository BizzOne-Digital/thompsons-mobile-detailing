import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getPublicServices } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";
import { formatCurrency } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Services",
  path: "/services",
});
export const dynamic = "force-dynamic";

const categories = [
  "Full Detail Packages",
  "Interior Services",
  "Exterior Services",
  "Paint Correction",
  "Ceramic Coating",
  "Add-Ons",
];

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const services = await getPublicServices();
  const filtered = category
    ? services.filter((s) => s.category === category)
    : services;

  return (
    <PageShell
      title="Detailing Services"
      subtitle="Filter by category and book the service that matches your vehicle's needs."
    >
      <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        <Link
          href="/services"
          className="shrink-0 rounded-full border border-gold/30 px-4 py-2 text-sm"
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/services?category=${encodeURIComponent(c)}`}
            className="shrink-0 rounded-full border border-gold/30 px-4 py-2 text-sm hover:bg-gold/10"
          >
            {c}
          </Link>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((service) => (
          <article key={String(service._id)} className="glass-panel rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-bright-gold">{service.name}</h2>
            <p className="mt-2 text-sm text-off-white/75">{service.shortDescription}</p>
            <p className="mt-4 text-sm">
              {service.customQuote
                ? "Custom quote"
                : `Starting at ${formatCurrency(service.startingPrice)}`}
            </p>
            <div className="mt-4 flex gap-3 text-sm">
              <Link href={`/services/${service.slug}`} className="text-bright-gold hover:underline">
                View details
              </Link>
              <Link href={`/booking?service=${service.slug}`} className="hover:underline">
                Book service
              </Link>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
