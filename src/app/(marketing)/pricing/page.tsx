import { buildMetadata } from "@/lib/seo";
import { getAddOns, getPublicServices } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";
import { PricingPageView } from "@/components/pricing/PricingPageView";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Transparent mobile detailing packages and add-on pricing for the Phoenix Metro — Refresh, Restore, and Reset details.",
  path: "/pricing",
});
export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const [services, addOns] = await Promise.all([
    getPublicServices(),
    getAddOns(),
  ]);

  return (
    <PageShell
      title="Pricing & Packages"
      subtitle="Clear, vehicle-based pricing for full details, add-ons, and specialty services — with an instant estimate before you book."
    >
      <PricingPageView
        services={services.map((s) => ({
          _id: String(s._id),
          name: s.name,
          slug: s.slug,
          category: s.category,
          shortDescription: s.shortDescription,
          features: s.features,
          customQuote: s.customQuote,
          startingPrice: s.startingPrice,
          vehiclePrices: s.vehiclePrices,
          estimatedDuration: s.estimatedDuration,
        }))}
        addOns={addOns.map((a) => ({
          _id: String(a._id),
          name: a.name,
          description: a.description,
          pricingType: a.pricingType,
          fixedPrice: a.fixedPrice,
          vehiclePrices: a.vehiclePrices,
        }))}
      />
    </PageShell>
  );
}
