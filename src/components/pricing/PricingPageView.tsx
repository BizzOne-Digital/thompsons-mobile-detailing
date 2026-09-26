"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Info } from "lucide-react";
import { VEHICLE_TYPES, type VehicleTypeId } from "@/lib/constants";
import {
  formatAddOnPrice,
  formatServicePrice,
  type PricingAddOn,
  type PricingService,
} from "@/lib/pricing-helpers";
import { Button } from "@/components/ui/Button";

const PACKAGE_SLUGS = ["refresh-detail", "restore-detail", "reset-detail"];

function AddOnTable({
  title,
  addOns,
  vehicleType,
}: {
  title: string;
  addOns: PricingAddOn[];
  vehicleType: VehicleTypeId;
}) {
  if (!addOns.length) return null;
  return (
    <div className="mt-8">
      <h3 className="font-display text-xl text-bright-gold">{title}</h3>
      <div className="-mx-4 mt-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="min-w-[min(100%,20rem)] overflow-hidden rounded-2xl border border-gold/20">
          <table className="w-full min-w-[280px] text-left text-sm">
            <thead className="bg-navy/80 text-off-white/70">
              <tr>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">
                  Description
                </th>
                <th className="px-4 py-3 font-medium text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {addOns.map((a) => (
                <tr key={a._id} className="border-t border-gold/10">
                  <td className="max-w-[10rem] px-3 py-4 font-medium break-words text-off-white sm:max-w-none sm:px-4">
                    <span className="block">{a.name}</span>
                    <span className="mt-2 block text-xs font-normal text-off-white/60 md:hidden">
                      {a.description}
                    </span>
                  </td>
                  <td className="hidden px-4 py-4 text-off-white/65 md:table-cell">
                    {a.description}
                  </td>
                  <td className="px-4 py-4 text-right whitespace-nowrap text-bright-gold">
                    {formatAddOnPrice(a, vehicleType)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function PricingPageView({
  services,
  addOns,
}: {
  services: PricingService[];
  addOns: (PricingAddOn & { section?: string })[];
}) {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState<VehicleTypeId>("sedan");

  const packages = PACKAGE_SLUGS.map((slug) =>
    services.find((s) => s.slug === slug)
  ).filter(Boolean) as PricingService[];

  const otherServices = services.filter(
    (s) => !PACKAGE_SLUGS.includes(s.slug)
  );

  const interiorAddOns = addOns.filter((a) => a.section === "interior");
  const exteriorAddOns = addOns.filter((a) => a.section === "exterior");
  const uncategorizedAddOns = addOns.filter((a) => !a.section);

  const goToBooking = (slug: string) => {
    router.push(`/booking?service=${slug}&vehicle=${vehicleType}`);
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
            restoration. Book online to choose your package, optional add-ons, and
            see your estimated total before submitting.
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

      <section>
        <h2 className="font-display text-2xl text-bright-gold">Add-on services</h2>
        <p className="mt-2 max-w-2xl text-sm text-off-white/70">
          Enhance any Refresh, Restore, or Reset detail with targeted treatments.
          During booking, only add-ons not already included in your package will
          appear.
        </p>
        <AddOnTable
          title="Interior add-ons"
          addOns={interiorAddOns}
          vehicleType={vehicleType}
        />
        <AddOnTable
          title="Exterior add-ons"
          addOns={exteriorAddOns}
          vehicleType={vehicleType}
        />
        {uncategorizedAddOns.length > 0 && (
          <AddOnTable
            title="Additional add-ons"
            addOns={uncategorizedAddOns}
            vehicleType={vehicleType}
          />
        )}
        <p className="mt-6 text-sm text-off-white/60">
          Browse full descriptions on the{" "}
          <Link href="/services?category=Add-Ons" className="text-bright-gold hover:underline">
            services page
          </Link>
          .
        </p>
      </section>

      {otherServices.length > 0 && (
        <section>
          <h2 className="font-display text-2xl text-bright-gold">
            Additional services
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {otherServices.map((s) => (
              <article key={s._id} className="glass-panel rounded-2xl p-6">
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
              Online booking submits a{" "}
              <strong className="text-off-white">request</strong> for review —
              your appointment is confirmed after we contact you.
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
