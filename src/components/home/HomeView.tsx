"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { BRAND, SERVICE_AREAS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeGoogleReviewsSection } from "@/components/home/HomeGoogleReviewsSection";
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
import { serviceAreaPath, slugForAreaName } from "@/lib/service-areas";

type Service = {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  startingPrice: number;
  vehiclePrices?: { sedan?: number; midsize?: number; large?: number };
};

type FeaturedReviewFallback = {
  _id: string;
  customerName: string;
  rating: number;
  review: string;
  vehicle?: string;
  serviceReceived?: string;
};

const PACKAGE_SLUGS = ["refresh-detail", "restore-detail", "reset-detail"] as const;

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
  "Professional-grade products and equipment on every job",
  "Precision and attention to detail on every vehicle",
  "Complete interior and exterior solutions",
  "Paint protection and ceramic coating options",
  "Transparent package pricing",
  "West Valley and Phoenix Metro coverage",
  "Quality inspection after every detail",
];

function PackageCards({ packages }: { packages: Service[] }) {
  return (
    <section className="bg-gradient-to-b from-royal/20 to-transparent py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title="Refresh, Restore & Reset"
          subtitle="Our main packages — matched to how your vehicle looks and feels today."
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
              className={`glass-panel overflow-hidden rounded-3xl ${
                pkg.slug === "reset-detail"
                  ? "ring-2 ring-bright-gold shadow-[0_0_40px_rgba(255,201,40,0.25)]"
                  : ""
              }`}
            >
              {PACKAGE_IMAGES[pkg.slug] && (
                <div className="relative aspect-[16/9]">
                  <Image
                    src={PACKAGE_IMAGES[pkg.slug]}
                    alt={`${pkg.name} — finished detail`}
                    fill
                    className="object-cover object-center brightness-[1.05] contrast-[1.03] saturate-[1.05]"
                    sizes="(max-width:1024px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="font-display text-2xl text-bright-gold">{pkg.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-off-white/80">
                  {pkg.shortDescription}
                </p>
                <p className="mt-4 text-lg">
                  Starting at{" "}
                  <span className="font-semibold text-bright-gold">
                    {formatCurrency(pkg.startingPrice)}
                  </span>
                </p>
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
  featuredReviewFallbacks,
  siteSettings,
  ownerPhotoUrl,
  teamGroupPhotoUrl,
  googleReviews,
}: {
  services: Service[];
  faqs: FaqItem[];
  featuredReviewFallbacks: FeaturedReviewFallback[];
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

      <HomeGoogleReviewsSection
        data={googleReviews}
        featuredFallbacks={featuredReviewFallbacks}
      />

      <PackageCards packages={packages} />

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20 lg:px-8">
        <SectionHeading
          title="Before & After Results"
          subtitle="A few of our strongest transformations — see the full gallery on Results."
          align="center"
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {HOME_FEATURED_BEFORE_AFTER.map((item) => (
            <BeforeAfterPairCard key={item.title} item={item} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/results" variant="outline">
            View Full Results Gallery
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
            {mainServices.map((service) => (
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
                  <h3 className="font-display text-lg text-bright-gold">
                    {service.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-off-white/75">
                    {service.shortDescription}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-off-white">
                    From {formatCurrency(service.startingPrice)}
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

      <section className="relative overflow-hidden bg-navy/50 py-16 md:py-20">
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title="Service Areas"
            subtitle="Avondale and the West Valley first — then the greater Phoenix Metro."
            align="center"
          />
          <div className="glass-panel mx-auto max-w-4xl rounded-3xl p-8">
            <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-3 lg:grid-cols-4">
              {SERVICE_AREAS.map((city) => {
                const slug = slugForAreaName(city);
                return slug ? (
                  <Link
                    key={city}
                    href={serviceAreaPath(slug)}
                    className="rounded-full border border-gold/25 px-3 py-2 text-center text-off-white/85 transition hover:border-gold/50 hover:text-bright-gold"
                  >
                    {city}
                  </Link>
                ) : (
                  <span
                    key={city}
                    className="rounded-full border border-gold/25 px-3 py-2 text-center text-off-white/85"
                  >
                    {city}
                  </span>
                );
              })}
            </div>
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
