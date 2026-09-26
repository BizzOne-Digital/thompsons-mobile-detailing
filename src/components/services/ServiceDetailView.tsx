"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Clock,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";
import { BRAND, VEHICLE_TYPES, type VehicleTypeId } from "@/lib/constants";
import { getServicePrice } from "@/lib/pricing-helpers";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export type ServiceDetailData = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  exclusions: string[];
  startingPrice: number;
  customQuote: boolean;
  estimatedDuration?: string;
  vehiclePrices?: { sedan?: number; midsize?: number; large?: number };
};

export type RelatedService = {
  slug: string;
  name: string;
  shortDescription: string;
  startingPrice: number;
  customQuote?: boolean;
};

const PACKAGE_SLUGS = ["refresh-detail", "restore-detail", "reset-detail"];

type GalleryImage = { url: string; alt: string };

export function ServiceDetailView({
  service,
  galleryImages,
  relatedServices,
}: {
  service: ServiceDetailData;
  galleryImages: GalleryImage[];
  relatedServices: RelatedService[];
}) {
  const [vehicleType, setVehicleType] = useState<VehicleTypeId>("sedan");

  const price = useMemo(
    () =>
      getServicePrice(
        {
          customQuote: service.customQuote,
          startingPrice: service.startingPrice,
          vehiclePrices: service.vehiclePrices,
        },
        vehicleType
      ),
    [service, vehicleType]
  );

  const descriptionParagraphs = service.fullDescription
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const isPackage = PACKAGE_SLUGS.includes(service.slug);
  const otherPackages = PACKAGE_SLUGS.filter((s) => s !== service.slug);

  const bookingHref = `/booking?service=${service.slug}&vehicle=${vehicleType}`;

  return (
    <div className="w-full min-w-0 space-y-12 lg:space-y-20">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-gold/35 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-bright-gold">
          {service.category}
        </span>
        {service.estimatedDuration && (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-off-white/80">
            <Clock className="h-3.5 w-3.5 text-bright-gold" />
            {service.estimatedDuration}
          </span>
        )}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-off-white/80">
          <MapPin className="h-3.5 w-3.5 text-bright-gold" />
          Mobile — Phoenix Metro
        </span>
      </div>

      <div className="grid min-w-0 gap-10 lg:grid-cols-[1fr_340px] lg:items-start xl:grid-cols-[1fr_380px]">
        <div className="space-y-12">
          <section>
            <h2 className="font-display text-2xl text-bright-gold md:text-3xl">
              Overview
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-off-white/85">
              {descriptionParagraphs.map((para) => (
                <p key={para.slice(0, 48)}>{para}</p>
              ))}
            </div>
          </section>

          {galleryImages.length > 0 && (
            <section>
              <h2 className="font-display text-xl text-bright-gold">
                What this service looks like
              </h2>
              <div
                className={`mt-6 grid gap-4 ${
                  galleryImages.length === 1
                    ? "grid-cols-1"
                    : "sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {galleryImages.slice(0, 3).map((img, i) => (
                  <div
                    key={`${img.url}-${i}`}
                    className={`relative overflow-hidden rounded-2xl border border-gold/15 ${
                      galleryImages.length === 1 ? "aspect-[21/9]" : "aspect-[4/3]"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      className="object-cover transition duration-500 hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-midnight/50 via-transparent to-transparent"
                      aria-hidden
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-bright-gold" />
              <h2 className="font-display text-2xl text-bright-gold">
                What&apos;s included
              </h2>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 rounded-xl border border-gold/15 bg-navy/25 px-4 py-3.5 text-sm text-off-white/88"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-bright-gold"
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {service.exclusions.length > 0 && (
            <section className="rounded-2xl border border-white/10 bg-black/20 p-6 md:p-8">
              <h2 className="font-display text-lg text-off-white/90">
                Not included
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-off-white/65">
                {service.exclusions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-off-white/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {isPackage && (
            <section className="glass-panel rounded-2xl p-6 md:p-8">
              <h2 className="font-display text-xl text-bright-gold">
                Compare detail packages
              </h2>
              <p className="mt-2 text-sm text-off-white/70">
                Not sure which level you need? View our other full-detail
                packages side by side on pricing.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {otherPackages.map((slug) => (
                  <Link
                    key={slug}
                    href={`/services/${slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-sm font-medium text-off-white transition hover:border-bright-gold hover:bg-gold/10"
                  >
                    View {slug.replace(/-/g, " ").replace(" detail", "")}
                    <ArrowRight className="h-4 w-4 text-bright-gold" />
                  </Link>
                ))}
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 text-sm text-bright-gold hover:underline"
                >
                  Full pricing & estimator
                </Link>
              </div>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-b from-navy/80 to-midnight shadow-[0_0_48px_rgba(255,201,40,0.08)]">
            <div className="border-b border-gold/20 bg-gold/5 px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-bright-gold">
                Your estimate
              </p>
              <p className="mt-1 text-sm text-off-white/70">
                Select vehicle size for accurate pricing.
              </p>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {VEHICLE_TYPES.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVehicleType(v.id)}
                    className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition md:text-xs ${
                      vehicleType === v.id
                        ? "bg-bright-gold text-midnight"
                        : "border border-gold/25 text-off-white/80 hover:border-gold/50"
                    }`}
                  >
                    {v.id === "sedan"
                      ? "Sedan"
                      : v.id === "midsize"
                        ? "Midsize"
                        : "Large"}
                  </button>
                ))}
              </div>

              <p className="mt-6 font-display text-4xl text-white">
                {service.customQuote
                  ? "Custom quote"
                  : price != null
                    ? formatCurrency(price)
                    : "—"}
              </p>
              {!service.customQuote && (
                <p className="mt-1 text-xs text-off-white/55">
                  {VEHICLE_TYPES.find((v) => v.id === vehicleType)?.label}
                </p>
              )}
              {service.customQuote && (
                <p className="mt-3 text-sm leading-relaxed text-off-white/65">
                  Starting at {formatCurrency(service.startingPrice)}. Final
                  price depends on paint condition — upload photos when booking.
                </p>
              )}

              <ul className="mt-6 space-y-2 border-t border-gold/15 pt-6 text-sm text-off-white/75">
                {VEHICLE_TYPES.map((v) => {
                  const p =
                    service.vehiclePrices?.[v.id] ?? service.startingPrice;
                  return (
                    <li
                      key={v.id}
                      className={`flex justify-between gap-2 ${
                        vehicleType === v.id ? "text-bright-gold" : ""
                      }`}
                    >
                      <span className="text-off-white/60">{v.label}</span>
                      <span className="font-medium">
                        {service.customQuote
                          ? "Quote"
                          : formatCurrency(p)}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <Button href={bookingHref} className="mt-8 w-full">
                Book this service
              </Button>
              <Link
                href="/pricing"
                className="mt-4 block text-center text-sm text-off-white/60 hover:text-bright-gold"
              >
                View all packages & add-ons
              </Link>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-off-white/50">
            Questions? Call{" "}
            <a
              href={BRAND.phoneHref}
              className="text-bright-gold hover:underline"
            >
              {BRAND.phone}
            </a>
          </p>
        </aside>
      </div>

      {relatedServices.length > 0 && (
        <section>
          <h2 className="font-display text-2xl text-bright-gold">
            Related services
          </h2>
          <p className="mt-2 text-sm text-off-white/70">
            More options in {service.category}.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="group glass-panel rounded-2xl p-5 transition hover:border-gold/40"
              >
                <h3 className="font-semibold text-off-white group-hover:text-bright-gold">
                  {rel.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-off-white/65">
                  {rel.shortDescription}
                </p>
                <p className="mt-3 text-sm font-medium text-bright-gold">
                  {rel.customQuote
                    ? "Custom quote"
                    : `From ${formatCurrency(rel.startingPrice)}`}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-off-white/50 group-hover:text-bright-gold">
                  View details
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-3xl border border-gold/25 bg-gradient-to-r from-royal/25 to-midnight px-8 py-10 text-center md:px-12">
        <p className="font-display text-2xl gold-gradient-text md:text-3xl">
          Ready to book {service.name}?
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sm text-off-white/75">
          We&apos;ll confirm your appointment after reviewing your request —
          fully mobile at your location.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href={bookingHref}>Book online</Button>
          <Button href="/contact" variant="outline">
            Ask a question
          </Button>
        </div>
      </section>
    </div>
  );
}
