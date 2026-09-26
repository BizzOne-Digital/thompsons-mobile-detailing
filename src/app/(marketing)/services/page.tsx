import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getAddOns, getPublicServices } from "@/lib/data";
import { formatAddOnStartingPrice } from "@/lib/add-on-display";
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
] as const;

type AddOnLean = Awaited<ReturnType<typeof getAddOns>>[number];

function AddOnServiceCard({ addOn }: { addOn: AddOnLean }) {
  return (
    <article className="glass-panel rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-bright-gold">{addOn.name}</h2>
      <p className="mt-2 text-sm font-medium text-off-white/90">
        {formatAddOnStartingPrice({
          pricingType: addOn.pricingType,
          fixedPrice: addOn.fixedPrice,
          vehiclePrices: addOn.vehiclePrices,
        })}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-off-white/75">
        {addOn.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <Link
          href="/booking?service=refresh-detail"
          className="text-bright-gold hover:underline"
        >
          Add when booking a package
        </Link>
      </div>
    </article>
  );
}

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

  const interiorAddOns = addOns.filter((a) => a.section === "interior");
  const exteriorAddOns = addOns.filter((a) => a.section === "exterior");

  let serviceCards = services;
  let addOnCards: AddOnLean[] = [];

  if (category === "Add-Ons") {
    serviceCards = [];
    addOnCards = addOns;
  } else if (category === "Interior Services") {
    serviceCards = services.filter((s) => s.category === category);
    addOnCards = interiorAddOns;
  } else if (category === "Exterior Services") {
    serviceCards = services.filter((s) => s.category === category);
    addOnCards = exteriorAddOns;
  } else if (category) {
    serviceCards = services.filter((s) => s.category === category);
  }

  const isEmpty = serviceCards.length === 0 && addOnCards.length === 0;

  return (
    <PageShell
      title="Detailing Services"
      subtitle="Filter by category and book the service that matches your vehicle's needs."
    >
      <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        <Link
          href="/services"
          className={`shrink-0 rounded-full border px-4 py-2 text-sm ${
            !category ? "border-gold bg-gold/15" : "border-gold/30"
          }`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/services?category=${encodeURIComponent(c)}`}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm hover:bg-gold/10 ${
              category === c ? "border-gold bg-gold/15" : "border-gold/30"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      {isEmpty ? (
        <p className="text-sm text-off-white/70">
          No services in this category yet. Choose another category or{" "}
          <Link href="/contact" className="text-bright-gold hover:underline">
            contact us
          </Link>{" "}
          for help.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {serviceCards.map((service) => (
            <article
              key={String(service._id)}
              className="glass-panel rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-bright-gold">
                {service.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-off-white/90">
                {service.customQuote
                  ? "Custom quote"
                  : `Starting at ${formatCurrency(service.startingPrice)}`}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-off-white/75">
                {service.fullDescription || service.shortDescription}
              </p>
              <div className="mt-4 flex gap-3 text-sm">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-bright-gold hover:underline"
                >
                  View details
                </Link>
                <Link
                  href={`/booking?service=${service.slug}`}
                  className="hover:underline"
                >
                  Book service
                </Link>
              </div>
            </article>
          ))}
          {addOnCards.map((addOn) => (
            <AddOnServiceCard key={String(addOn._id)} addOn={addOn} />
          ))}
        </div>
      )}

      {!category && addOns.length > 0 && (
        <p className="mt-10 text-center text-sm text-off-white/60">
          Optional add-ons are listed under{" "}
          <Link
            href="/services?category=Add-Ons"
            className="text-bright-gold hover:underline"
          >
            Add-Ons
          </Link>
          ,{" "}
          <Link
            href="/services?category=Interior%20Services"
            className="text-bright-gold hover:underline"
          >
            Interior Services
          </Link>
          , and{" "}
          <Link
            href="/services?category=Exterior%20Services"
            className="text-bright-gold hover:underline"
          >
            Exterior Services
          </Link>
          .
        </p>
      )}
    </PageShell>
  );
}
