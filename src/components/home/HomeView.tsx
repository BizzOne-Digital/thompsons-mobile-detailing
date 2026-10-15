"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeGoogleReviewsSection } from "@/components/home/HomeGoogleReviewsSection";
import {
  getPackageShortDescription,
  PACKAGE_BADGES,
  PACKAGE_SECTION_SUBTITLE,
} from "@/lib/package-display-copy";
import {
  getServiceDisplayName,
  getServiceTagline,
  serviceTitleColorClass,
} from "@/lib/service-catalog-copy";
import { VehiclePriceTiers } from "@/components/pricing/PriceDisplay";
import {
  CLIENT_IMAGES,
  HOME_FEATURED_BEFORE_AFTER,
} from "@/lib/client-images";
import { PACKAGE_IMAGES, SERVICE_SLUG_IMAGES } from "@/lib/site-images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BeforeAfterPairCard } from "@/components/home/BeforeAfterPairCard";
import { FaqAccordion, type FaqItem } from "@/components/faq/FaqAccordion";
import { formatCurrency } from "@/lib/utils";
import type { PublicSiteSettings } from "@/lib/public-settings";
import type { GoogleReviewsSnapshot } from "@/lib/google-reviews";

type Service = {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  startingPrice: number;
  vehiclePrices?: { sedan?: number; midsize?: number; large?: number };
};

const PACKAGE_SLUGS = ["refresh-detail", "restore-detail", "reset-detail"] as const;

function PackageBadge({ slug }: { slug: string }) {
  const badge = PACKAGE_BADGES[slug];
  if (!badge) return null;
  const popular = badge.variant === "popular";
  return (
    <span
      className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide ${
        popular
          ? "border border-bright-gold/80 bg-gradient-to-b from-bright-gold via-gold to-soft-gold text-midnight shadow-[0_3px_0_rgba(0,0,0,0.35),0_0_20px_rgba(255,201,40,0.55)]"
          : "border border-gold/50 bg-gradient-to-b from-navy/90 to-midnight text-bright-gold shadow-[0_3px_0_rgba(0,0,0,0.4),0_0_12px_rgba(255,201,40,0.2)]"
      }`}
    >
      {badge.label}
    </span>
  );
}

const MAIN_SERVICE_SLUGS = [
  "signature-foam-hand-wash",
  "ceramic-coating",
  "paint-correction",
  "headlight-restoration",
  "engine-bay-detail",
  "pet-hair-removal",
] as const;

const bookingSteps = [
  {
    title: "Choose Your Detail",
    description:
      "Select the service or package that best fits the vehicle.",
  },
  {
    title: "Choose Your Date & Location",
    description:
      "Select the preferred appointment time and enter the service address.",
  },
  {
    title: "Confirm Your Details",
    description:
      "Enter contact and vehicle information and add optional services, notes, or special instructions if needed.",
  },
  {
    title: "Submit Your Booking",
    description: "Send the request and receive confirmation.",
  },
] as const;

const whyChoose = [
  "Driven by passion. Committed to excellence.",
  "Quality in every step. Sharp attention to detail.",
  "Respect for your vehicle. Value for your time.",
  "Service built on integrity, honest recommendations, and clear pricing.",
  "Professional-grade products and equipment for a superior finish.",
  "Every detail ends with a final inspection.",
  "Factory Fresh Results Guaranteed.",
];

function PackageCards({ packages }: { packages: Service[] }) {
  return (
    <section className="bg-gradient-to-b from-royal/20 to-transparent py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title="Refresh, Restore & Reset"
          subtitle={PACKAGE_SECTION_SUBTITLE}
          align="center"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <motion.article
              key={pkg._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`glass-panel relative overflow-hidden rounded-3xl ${
                pkg.slug === "restore-detail"
                  ? "ring-2 ring-bright-gold shadow-[0_0_40px_rgba(255,201,40,0.25)]"
                  : ""
              }`}
            >
              <PackageBadge slug={pkg.slug} />
              {PACKAGE_IMAGES[pkg.slug] && (
                <div className="relative aspect-[16/9] overflow-hidden bg-midnight/40">
                  <Image
                    src={PACKAGE_IMAGES[pkg.slug]}
                    alt={`${pkg.name} — finished detail`}
                    fill
                    className="object-cover object-center brightness-[1.06] contrast-[1.04] saturate-[1.06]"
                    sizes="(max-width:1024px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6">
                <h3
                  className={`font-display text-2xl ${serviceTitleColorClass(index)}`}
                >
                  {pkg.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-off-white/80">
                  {getPackageShortDescription(pkg.slug, pkg.shortDescription)}
                </p>
                <div className="mt-5">
                  <VehiclePriceTiers
                    vehiclePrices={pkg.vehiclePrices}
                    startingPrice={pkg.startingPrice}
                    compact
                  />
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    href={`/services/${pkg.slug}`}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    View Full Details
                  </Button>
                  <Button
                    href={`/booking?service=${pkg.slug}`}
                    className="w-full sm:w-auto"
                  >
                    Book This Package
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeView({
  services,
  faqs,
  siteSettings,
  ownerPhotoUrl,
  teamGroupPhotoUrl,
  googleReviews,
}: {
  services: Service[];
  faqs: FaqItem[];
  googleReviews: GoogleReviewsSnapshot;
  siteSettings: Pick<
    PublicSiteSettings,
    "heroMediaUrl" | "heroHeadline" | "heroSubheadline" | "heroDescription" | "aboutText"
  >;
  ownerPhotoUrl: string;
  teamGroupPhotoUrl: string;
}) {
  const packages = services.filter((s) =>
    PACKAGE_SLUGS.includes(s.slug as (typeof PACKAGE_SLUGS)[number])
  );
  const mainServices = MAIN_SERVICE_SLUGS.map((slug) =>
    services.find((s) => s.slug === slug)
  ).filter(Boolean) as Service[];

  const aboutCopy =
    siteSettings.aboutText?.trim() ||
    "Thompson's Mobile Detailing AZ is a family-owned, owner-operated mobile auto detailing service serving Avondale, the West Valley, and the greater Phoenix Metro.";

  return (
    <div className="w-full min-w-0 overflow-x-clip">
      <HeroSection settings={siteSettings} />

      <HomeGoogleReviewsSection data={googleReviews} />

      <PackageCards packages={packages} />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20 lg:px-8">
        <SectionHeading
          title="Before & After Results"
          subtitle="See the difference expert detailing makes—from neglected to factory fresh."
          align="center"
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {HOME_FEATURED_BEFORE_AFTER.map((item) => (
            <BeforeAfterPairCard key={item.title} item={item} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/results" variant="outline">
            Explore More Transformations
          </Button>
        </div>
      </section>

      <section className="border-y border-gold/15 bg-navy/40 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Main Services"
            subtitle="Packages, add-ons, and specialty work — all mobile at your location."
            align="center"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mainServices.map((service, serviceIndex) => (
              <Link
                key={service._id}
                href={`/services/${service.slug}`}
                className="glass-panel group flex flex-col overflow-hidden rounded-2xl border border-gold/15 transition hover:border-gold/40"
              >
                {SERVICE_SLUG_IMAGES[service.slug] && (
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={SERVICE_SLUG_IMAGES[service.slug]}
                      alt={service.name}
                      fill
                      className="object-cover object-center brightness-[1.04] contrast-[1.03] transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width:1024px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3
                    className={`font-display text-lg ${serviceTitleColorClass(serviceIndex)}`}
                  >
                    {getServiceDisplayName(service.slug, service.name)}
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-off-white/75">
                    {getServiceTagline(service.slug, service.shortDescription)}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-off-white">
                    {formatCurrency(
                      service.vehiclePrices?.sedan ?? service.startingPrice
                    )}
                    <span className="font-normal text-off-white/55">
                      {" "}
                      sedan · see tiers on details
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/services">View All Services</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20 lg:px-8">
        <SectionHeading title="Why Choose Thompson's" />
        <div className="grid gap-4 md:grid-cols-2">
          {whyChoose.map((item) => (
            <div
              key={item}
              className="flex gap-3 rounded-xl border border-gold/20 p-4"
            >
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <p className="text-off-white/85">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20 lg:px-8">
        <SectionHeading
          title="About Vernon & Our Family-Owned Team"
          subtitle="Personal service, professional results — at your home, office, or driveway."
        />
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-gold/40">
                <Image
                  src={ownerPhotoUrl || CLIENT_IMAGES.ownerPortrait}
                  alt="Vernon Thompson, owner and operator"
                  fill
                  className="object-cover"
                  sizes="(max-width:640px) 50vw, 240px"
                />
              </div>
              <p className="mt-3 text-center font-display text-lg text-bright-gold">
                Vernon Thompson
              </p>
              <p className="text-center text-sm text-off-white/65">
                Owner & Operator
              </p>
            </div>
            <div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-gold/40">
                <Image
                  src={teamGroupPhotoUrl || CLIENT_IMAGES.teamGroup}
                  alt="Thompson family and detailing team"
                  fill
                  className="object-cover object-[center_35%]"
                  sizes="(max-width:640px) 50vw, 240px"
                />
              </div>
              <p className="mt-3 text-center font-display text-lg text-bright-gold">
                Family-Owned
              </p>
              <p className="text-center text-sm text-off-white/65">
                Owner-Operated
              </p>
            </div>
          </div>
          <div className="space-y-5 text-off-white/80">
            <p className="leading-relaxed">{aboutCopy}</p>
            <p className="text-sm leading-relaxed text-off-white/70">
              We bring our own water, power, equipment, and professional products
              to you — so you get a full detail without leaving home. That mobile
              convenience is core to how we work; you will see it reflected in
              every appointment.
            </p>
            <Button href="/about">Learn More About Us</Button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20 carbon-bg">
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Simple Booking Process"
            subtitle="Four steps to request your mobile detail."
            align="center"
          />
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {bookingSteps.map((step, i) => (
              <li key={step.title} className="glass-panel rounded-2xl p-5">
                <span className="font-display text-xl text-bright-gold">
                  {i + 1}
                </span>
                <p className="mt-2 font-semibold text-off-white">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-off-white/70">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-8 text-center">
            <Button href="/booking">Start Your Booking</Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 md:py-20 lg:px-8">
        <SectionHeading title="Frequently Asked Questions" align="center" />
        <FaqAccordion items={faqs.slice(0, 6)} />
        <div className="mt-8 text-center">
          <Link href="/faq" className="text-bright-gold hover:underline">
            View all FAQs
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl p-10 text-center">
          <Image
            src={CLIENT_IMAGES.bookingHeroOutdoor}
            alt=""
            fill
            className="object-cover object-center brightness-[1.05] contrast-[1.04]"
            sizes="100vw"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/45" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl gold-gradient-text">
              Ready for Factory-Fresh Results?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-white/85">
              Book online or call — we come to you across Avondale, the West
              Valley, and the Phoenix Metro.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/booking">Book Online</Button>
              <Button href={BRAND.phoneHref} variant="outline">
                Call Now
              </Button>
              <Button href={BRAND.smsHref} variant="outline">
                Text Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
