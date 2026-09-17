"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star } from "lucide-react";
import { BRAND, SERVICE_AREAS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { HeroSection } from "@/components/home/HeroSection";
import { ImageShowcaseStrip } from "@/components/home/ImageShowcaseStrip";
import { HomeAdditionalShowcase } from "@/components/home/HomeAdditionalShowcase";
import { HomeLiveFootageSection } from "@/components/home/HomeLiveFootageSection";
import { HomePorscheInteriorSection } from "@/components/home/HomePorscheInteriorSection";
import { MobileVanServicesSection } from "@/components/home/MobileVanServicesSection";
import { CLIENT_BEFORE_AFTER_PAIRS, CLIENT_IMAGES } from "@/lib/client-images";
import { PACKAGE_IMAGES, SITE_IMAGES } from "@/lib/site-images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { BeforeAfterPairCard } from "@/components/home/BeforeAfterPairCard";
import { FaqAccordion, type FaqItem } from "@/components/faq/FaqAccordion";
import { formatCurrency } from "@/lib/utils";
import type { PublicSiteSettings } from "@/lib/public-settings";

type Service = {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  startingPrice: number;
  vehiclePrices?: { sedan?: number; midsize?: number; large?: number };
  features?: string[];
};

type Testimonial = {
  _id: string;
  customerName: string;
  rating: number;
  review: string;
  vehicle?: string;
};

const trustPoints = [
  "Fully Mobile Service",
  "Premium Products",
  "Professional Equipment",
  "Valley-Wide Coverage",
  "5-Star Rated",
  "Open 7 Days a Week",
];

const processSteps = [
  "Select your service",
  "Choose vehicle type",
  "Select date and time",
  "Enter service location",
  "Receive booking confirmation",
  "We arrive fully equipped",
  "Enjoy factory-fresh results",
];

const whyChoose = [
  "Mobile convenience at your home, office, or driveway",
  "Professional-grade products and equipment",
  "Precision and attention to detail on every vehicle",
  "Complete interior and exterior solutions",
  "Paint protection and ceramic coating options",
  "Transparent package pricing",
  "Valley-wide Phoenix Metro coverage",
  "Quality inspection after every detail",
];

export function HomeView({
  services,
  faqs,
  testimonials,
  siteSettings,
  ownerPhotoUrl,
  teamGroupPhotoUrl,
}: {
  services: Service[];
  faqs: FaqItem[];
  testimonials: Testimonial[];
  siteSettings: Pick<
    PublicSiteSettings,
    "heroMediaUrl" | "heroHeadline" | "heroSubheadline" | "heroDescription" | "aboutText"
  >;
  ownerPhotoUrl: string;
  teamGroupPhotoUrl: string;
}) {
  const [introDone, setIntroDone] = useState(false);
  const onIntroComplete = useCallback(() => setIntroDone(true), []);

  const packages = services.filter((s) =>
    ["refresh-detail", "restore-detail", "reset-detail"].includes(s.slug)
  );

  return (
    <>
      <CinematicIntro onComplete={onIntroComplete} />
      <div
        className={`w-full min-w-0 overflow-x-clip ${introDone ? "opacity-100" : "opacity-0"}`}
      >
        <HeroSection introDone={introDone} settings={siteSettings} />

        <HomePorscheInteriorSection />

        <HomeLiveFootageSection />

        <MobileVanServicesSection />

        <section className="border-y border-gold/20 bg-navy/60 py-6">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-4 px-4 text-sm md:gap-8">
            {trustPoints.map((point) => (
              <span key={point} className="flex items-center gap-2 text-off-white/85">
                <ShieldCheck className="h-4 w-4 text-gold" />
                {point}
              </span>
            ))}
          </div>
        </section>

        <ImageShowcaseStrip />

        <HomeAdditionalShowcase />

        <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <SectionHeading
            title="About Thompson's Mobile Detailing"
            subtitle="Restoring, protecting, and maintaining every vehicle with precision and professionalism."
          />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start">
            <div className="mx-auto w-full max-w-xs lg:mx-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-gold/40 shadow-[0_0_40px_rgba(255,201,40,0.12)]">
                <Image
                  src={ownerPhotoUrl || CLIENT_IMAGES.ownerPortrait}
                  alt="Vernon Thompson, owner of Thompson's Mobile Detailing AZ"
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
              <p className="mt-4 text-center font-display text-lg text-bright-gold">
                Vernon Thompson
              </p>
              <p className="text-center text-sm text-off-white/65">Owner & operator</p>
            </div>
            <div className="space-y-6">
              <p className="text-off-white/80">
                Thompson&apos;s Mobile Detailing AZ provides professional mobile auto
                detailing throughout the Valley, bringing spotless water, power,
                professional equipment, and premium products directly to your home
                or workplace.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Mobile Service", value: "100%" },
                  { label: "Valley Cities", value: "14+" },
                  { label: "Hours / Week", value: "7 Days" },
                  { label: "Google Rating", value: "5-Star" },
                ].map((stat) => (
                  <div key={stat.label} className="glass-panel rounded-2xl p-4">
                    <p className="text-2xl font-semibold text-bright-gold">{stat.value}</p>
                    <p className="text-sm text-off-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Button href="/about">Learn More</Button>
            </div>
          </div>
          <div className="mt-12 w-full min-w-0 overflow-hidden rounded-3xl border border-gold/25 bg-navy/30">
            <div className="relative aspect-[4/5] w-full max-h-[min(70vh,520px)] sm:aspect-[16/10] sm:max-h-none md:aspect-[21/9]">
              <Image
                src={teamGroupPhotoUrl || CLIENT_IMAGES.teamGroup}
                alt="Thompson's Mobile Detailing AZ team and family"
                fill
                className="object-cover object-[center_35%] sm:object-center"
                sizes="(max-width: 768px) 100vw, 1280px"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/15 to-transparent"
                aria-hidden
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-bright-gold sm:text-xs">
                  Family owned & operated
                </p>
                <p className="mt-2 max-w-xl text-sm text-white/90 sm:text-base">
                  Vernon and the crew bring the same care to every detail — at your
                  driveway, office, or job site across the Valley.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-royal/20 to-transparent py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <SectionHeading
              title="Featured Detailing Packages"
              subtitle="Maintenance, deep clean, and complete restoration packages for every vehicle condition."
              align="center"
            />
            <div className="grid gap-6 lg:grid-cols-3">
              {packages.map((pkg, index) => (
                <motion.article
                  key={pkg._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
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
                        alt={`${pkg.name} detailing`}
                        fill
                        className="object-cover"
                        sizes="(max-width:1024px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
                    </div>
                  )}
                  <div className="p-6">
                  <h3 className="font-display text-2xl text-bright-gold">{pkg.name}</h3>
                  <p className="mt-2 text-sm text-off-white/75">{pkg.shortDescription}</p>
                  <p className="mt-4 text-lg">
                    Starting at{" "}
                    <span className="font-semibold text-bright-gold">
                      {formatCurrency(pkg.startingPrice)}
                    </span>
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-off-white/75">
                    {(pkg.features || []).slice(0, 5).map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
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

        <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <SectionHeading
            title="Before & After Results"
            subtitle="Real transformations from our mobile detailing — exterior, interior, paint, and full details."
            align="center"
          />
          <div className="grid gap-8 md:grid-cols-2">
            {CLIENT_BEFORE_AFTER_PAIRS.map((item) => (
              <BeforeAfterPairCard key={item.title} item={item} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/results">View Full Results Gallery</Button>
          </div>
        </section>

        <section className="relative py-20 carbon-bg overflow-hidden">
          <Image
            src={SITE_IMAGES.suvFullDetail}
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            aria-hidden
          />
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <SectionHeading title="Our Booking Process" align="center" />
            <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, i) => (
                <li key={step} className="glass-panel rounded-2xl p-5">
                  <span className="text-bright-gold font-display text-xl">{i + 1}</span>
                  <p className="mt-2 font-medium">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <div className="mb-12 grid gap-4 md:grid-cols-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:col-span-2">
              <Image
                src={SITE_IMAGES.ceramicCoating}
                alt="Ceramic coating finish on luxury vehicle"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 66vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={SITE_IMAGES.engineBay}
                alt="Engine bay detailing"
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          </div>
          <SectionHeading title="Why Choose Thompson's" />
          <div className="grid gap-4 md:grid-cols-2">
            {whyChoose.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl border border-gold/20 p-4">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <p className="text-off-white/85">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden bg-navy/50 py-20">
          <Image
            src={SITE_IMAGES.mobileVanSetup}
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="100vw"
            aria-hidden
          />
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <SectionHeading
              title="Phoenix Metro Service Area"
              subtitle="We come to you across the Valley."
              align="center"
            />
            <div className="glass-panel mx-auto max-w-4xl rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-3 lg:grid-cols-4">
                {SERVICE_AREAS.map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-gold/25 px-3 py-2 text-center text-off-white/85"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <SectionHeading
            title="Customer Testimonials"
            subtitle="Five-star mobile detailing across the Phoenix Metro."
            align="center"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.slice(0, 4).map((t) => (
              <article key={t._id} className="glass-panel rounded-2xl p-6">
                <div className="flex gap-1 text-bright-gold">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-off-white/85">{t.review}</p>
                <p className="mt-4 text-sm text-bright-gold">
                  {t.customerName}
                  {t.vehicle ? ` · ${t.vehicle}` : ""}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/testimonials" variant="outline">All Testimonials</Button>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-20 lg:px-8">
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
              src={SITE_IMAGES.foamWashArizona}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-royal/80 to-black/70" />
            <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl gold-gradient-text">
              Ready for Factory-Fresh Results?
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/booking">Book Online</Button>
              <Button href={BRAND.phoneHref} variant="outline">Call Now</Button>
              <Button href={BRAND.smsHref} variant="outline">Text Us</Button>
              <Button href="/pricing" variant="ghost">View Pricing</Button>
            </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
