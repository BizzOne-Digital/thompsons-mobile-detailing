import { buildMetadata } from "@/lib/seo";
import { getAddOns, getPublicServices } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata = buildMetadata({ title: "Book Online", path: "/booking" });
export const dynamic = "force-dynamic";

export default async function BookingPage() {
  const [services, addOns] = await Promise.all([getPublicServices(), getAddOns()]);

  return (
    <PageShell
      title="Book Your Detail"
      subtitle="Submit a booking request for review. Your appointment is not confirmed until we contact you."
    >
      <BookingWizard
        services={services.map((s) => ({
          _id: String(s._id),
          name: s.name,
          slug: s.slug,
          customQuote: s.customQuote,
          startingPrice: s.startingPrice,
          vehiclePrices: s.vehiclePrices,
        }))}
        addOns={addOns.map((a) => ({
          _id: String(a._id),
          name: a.name,
          pricingType: a.pricingType,
          fixedPrice: a.fixedPrice,
          vehiclePrices: a.vehiclePrices,
        }))}
      />
    </PageShell>
  );
}
