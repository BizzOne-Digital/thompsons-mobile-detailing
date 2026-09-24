import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getAddOns, getPublicServices } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";
import { formatCurrency } from "@/lib/utils";
import { AddOnServicesCatalog } from "@/components/services/AddOnServicesCatalog";
import { sortAddOnsByDisplayOrder } from "@/lib/booking-add-ons";

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
  "Add-On Services",
];

const ADD_ON_CATEGORY = "Add-On Services";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [services, addOns] = await Promise.all([
    getPublicServices(),
    getAddOns(),
  ]);
  const isAddOnView = category === ADD_ON_CATEGORY;
  const filtered = category && !isAddOnView
    ? services.filter((s) => s.category === category)
    : isAddOnView
      ? []
      : services;

  const catalogAddOns = sortAddOnsByDisplayOrder(
    addOns.map((a) => ({
      _id: String(a._id),
      slug: a.slug,
      name: a.name,
      description: a.description,
      category: a.category as "Interior" | "Exterior" | undefined,
      pricingType: a.pricingType,
      fixedPrice: a.fixedPrice,
      vehiclePrices: a.vehiclePrices,
      displayOrder: a.displayOrder,
    }))
  );

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
      {isAddOnView && (
        <AddOnServicesCatalog
          addOns={catalogAddOns}
          intro="Browse every optional add-on service. When you book Refresh, Restore, or Reset, you can add any service below that is not already included in your package."
        />
      )}
      {!category && catalogAddOns.length > 0 && (
        <section className="mt-16 border-t border-gold/20 pt-12">
          <h2 className="font-display text-2xl text-bright-gold">Add-On Services</h2>
          <AddOnServicesCatalog
            addOns={catalogAddOns}
            intro="Additional treatments available on their own or with a full detail package."
          />
        </section>
      )}
    </PageShell>
  );
}
