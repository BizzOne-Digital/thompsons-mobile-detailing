"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Info } from "lucide-react";
import {
  DETAIL_PACKAGE_SLUGS,
  ESTIMATED_TOTAL_DISCLAIMER,
  VEHICLE_TYPES,
  type VehicleTypeId,
} from "@/lib/constants";
import {
  filterAddOnsForPackageBooking,
  isDetailPackageSlug,
} from "@/lib/booking-add-ons";
import { AddOnServicesCatalog } from "@/components/services/AddOnServicesCatalog";
import {
  formatAddOnPrice,
  formatServicePrice,
  getServicePrice,
  type PricingAddOn,
  type PricingService,
} from "@/lib/pricing-helpers";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const PACKAGE_SLUGS = [...DETAIL_PACKAGE_SLUGS];

export function PricingPageView({
  services,
  addOns,
}: {
  services: PricingService[];
  addOns: PricingAddOn[];
}) {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState<VehicleTypeId>("sedan");
  const [serviceId, setServiceId] = useState(services[0]?._id ?? "");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const packages = PACKAGE_SLUGS.map((slug) =>
    services.find((s) => s.slug === slug)
  ).filter(Boolean) as PricingService[];

  const otherServices = services.filter(
    (s) => !(PACKAGE_SLUGS as readonly string[]).includes(s.slug)
  );

  const selectedService = services.find((s) => s._id === serviceId);

  const bookableAddOns = useMemo(
    () => filterAddOnsForPackageBooking(addOns, selectedService?.slug),
    [addOns, selectedService?.slug]
  );

  const selectedBookableAddOnIds = useMemo(() => {
    const allowed = new Set(bookableAddOns.map((a) => a._id));
    return selectedAddOns.filter((id) => allowed.has(id));
  }, [selectedAddOns, bookableAddOns]);

  const estimateTotal = useMemo(() => {
    if (!selectedService) return 0;
    const base = getServicePrice(selectedService, vehicleType) ?? 0;
    const addOnTotal = bookableAddOns
      .filter((a) => selectedBookableAddOnIds.includes(a._id))
      .reduce((sum, a) => {
        if (a.pricingType === "vehicle" && a.vehiclePrices) {
          return sum + (a.vehiclePrices[vehicleType] ?? a.fixedPrice ?? 0);
        }
        return sum + (a.fixedPrice ?? 0);
      }, 0);
    return base + addOnTotal;
  }, [selectedService, vehicleType, selectedBookableAddOnIds, bookableAddOns]);

  const goToBooking = (slug?: string) => {
    const service = slug
      ? services.find((s) => s.slug === slug)
      : selectedService;
    const params = new URLSearchParams({
      service: service?.slug ?? "",
      vehicle: vehicleType,
      addOns: selectedBookableAddOnIds.join(","),
    });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className="w-full min-w-0 space-y-12 md:space-y-16">
      <section className="glass-panel rounded-2xl p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-bright-gold">
          Select vehicle size
        </p>
        <p className="mt-2 text-sm text-off-white/70">
          Prices update automatically for your vehicle type.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {VEHICLE_TYPES.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setVehicleType(v.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                vehicleType === v.id
                  ? "bg-gradient-to-r from-soft-gold via-bright-gold to-gold text-midnight shadow-[0_0_24px_rgba(255,201,40,0.35)]"
                  : "border border-gold/30 text-off-white/85 hover:border-gold/60"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-8 max-w-2xl">
          <h2 className="font-display text-2xl text-bright-gold md:text-3xl">
            Full detail packages
          </h2>
          <p className="mt-2 text-sm text-off-white/70">
            Refresh for maintenance, Restore for deep cleaning, Reset for maximum
            restoration.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((pkg) => {
            const highlight = pkg.slug === "reset-detail";
            return (
              <article
                key={pkg._id}
                className={`flex flex-col overflow-hidden rounded-2xl border ${
                  highlight
                    ? "border-bright-gold/60 bg-gradient-to-b from-gold/10 to-navy/40 shadow-[0_0_40px_rgba(255,201,40,0.12)]"
                    : "border-gold/20 bg-navy/30"
                }`}
              >
                <div className="border-b border-gold/15 p-6">
                  <h3 className="font-display text-xl text-bright-gold">
                    {pkg.name}
                  </h3>
                  <p className="mt-2 text-sm text-off-white/70">
                    {pkg.shortDescription}
                  </p>
                  <p className="mt-5 font-display text-4xl text-white">
                    {formatServicePrice(pkg, vehicleType)}
                  </p>
                  {pkg.estimatedDuration && (
                    <p className="mt-1 text-xs text-off-white/50">
                      Est. {pkg.estimatedDuration}
                    </p>
                  )}
                </div>
                <ul className="flex-1 space-y-2.5 p-6 text-sm text-off-white/80">
                  {(pkg.features ?? []).slice(0, 7).map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-bright-gold" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2 border-t border-gold/15 p-6">
                  <Button href={`/services/${pkg.slug}`} variant="outline">
                    View details
                  </Button>
                  <Button onClick={() => goToBooking(pkg.slug)}>
                    Book this package
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="glass-panel rounded-2xl p-6 md:p-8">
        <h2 className="font-display text-2xl text-bright-gold">
          Build your estimate
        </h2>
        <p className="mt-2 text-sm text-off-white/70">
          Choose a service and optional add-ons, then continue to booking with
          your selections saved.
        </p>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm text-off-white/80">
              Service
              <select
                className="mt-2 w-full rounded-xl border border-gold/30 bg-midnight px-4 py-3"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
              >
                {services.map((s) => (
                  <option key={s._id} value={s._id}>{s.name}</option>
                ))}
              </select>
            </label>
            <p className="text-xs text-off-white/55">
              Vehicle:{" "}
              {VEHICLE_TYPES.find((v) => v.id === vehicleType)?.label}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-off-white/80">Add-ons</p>
            {!bookableAddOns.length ? (
              <p className="mt-3 text-sm text-off-white/55">
                {isDetailPackageSlug(selectedService?.slug)
                  ? "All optional add-ons are already included in this package, or add-ons apply to Refresh, Restore, and Reset packages only."
                  : "Optional add-ons are available when you book Refresh, Restore, or Reset detail packages."}
              </p>
            ) : (
            <div className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1">
              {bookableAddOns.map((a) => (
                <label
                  key={a._id}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-gold/15 px-4 py-3 hover:border-gold/35"
                >
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={selectedAddOns.includes(a._id)}
                    onChange={(e) => {
                      setSelectedAddOns((prev) =>
                        e.target.checked
                          ? [...prev, a._id]
                          : prev.filter((id) => id !== a._id)
                      );
                    }}
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{a.name}</span>
                    <span className="mt-1 block text-xs text-off-white/60">
                      {a.description}
                    </span>
                    <span className="mt-1 block text-xs text-bright-gold">
                      {formatAddOnPrice(a, vehicleType)}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            )}
          </div>
        </div>
        <div className="mt-8 flex flex-col items-stretch gap-6 border-t border-gold/20 pt-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-off-white/60">Estimated Total</p>
            <p className="mt-1 font-display text-4xl text-bright-gold">
              {selectedService?.customQuote
                ? "Custom quote"
                : formatCurrency(estimateTotal)}
            </p>
            <p className="mt-2 max-w-md text-xs text-off-white/55">
              {ESTIMATED_TOTAL_DISCLAIMER}
            </p>
            {selectedService?.customQuote && (
              <p className="mt-2 max-w-md text-xs text-off-white/55">
                Final price depends on paint condition and inspection. Upload
                photos when booking.
              </p>
            )}
          </div>
          <Button onClick={() => goToBooking()} className="w-full sm:w-auto">
            Continue to booking
          </Button>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl text-bright-gold">Add-On Services</h2>
        <div className="mt-6">
          <AddOnServicesCatalog
            addOns={addOns}
            vehicleType={vehicleType}
            intro="Every optional add-on available at Thompson's Mobile Detailing — organized by interior and exterior. Book a full detail package to add any service that is not already included in your package."
          />
        </div>
      </section>

      {otherServices.length > 0 && (
        <section>
          <h2 className="font-display text-2xl text-bright-gold">
            Additional services
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {otherServices.map((s) => (
              <article
                key={s._id}
                className="glass-panel rounded-2xl p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-semibold text-off-white">{s.name}</h3>
                  <span className="text-lg font-semibold text-bright-gold">
                    {formatServicePrice(s, vehicleType)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-off-white/65">
                  {s.shortDescription}
                </p>
                <Link
                  href={`/booking?service=${s.slug}&vehicle=${vehicleType}`}
                  className="mt-4 inline-block text-sm text-bright-gold hover:underline"
                >
                  Request this service
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-gold/20 bg-navy/40 p-6 md:p-8">
        <div className="flex gap-3">
          <Info className="h-5 w-5 shrink-0 text-gold" aria-hidden />
          <div className="space-y-3 text-sm text-off-white/75">
            <p>
              <strong className="text-off-white">Starting at</strong> and{" "}
              <strong className="text-off-white">custom quote</strong> services
              are priced after we review vehicle condition, size, and scope.
            </p>
            <p>
              Online booking submits a <strong className="text-off-white">request</strong>{" "}
              for review — your appointment is confirmed after we contact you.
            </p>
            <p>We do not collect payment on the website at this time.</p>
          </div>
        </div>
      </section>

      <div className="rounded-3xl border border-gold/25 bg-gradient-to-r from-royal/30 to-midnight px-8 py-10 text-center">
        <p className="font-display text-2xl gold-gradient-text">
          Ready for factory-fresh results?
        </p>
        <Button href="/booking" className="mt-6">
          Book online
        </Button>
      </div>
    </div>
  );
}
