import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { BRAND, SERVICE_AREAS } from "@/lib/constants";
import {
  CLIENT_DEEP_CLEAN_GALLERY,
  CLIENT_ESCALADE_GALLERY,
  CLIENT_IMAGES,
  CLIENT_PORSCHE_GALLERY,
} from "@/lib/client-images";
import { Button } from "@/components/ui/Button";
import {
  ABOUT_VIDEO_ASPECT,
  AboutPhotoPair,
  AboutShowcaseVideo,
} from "@/components/about/AboutShowcaseMedia";

const aboutPhotos = CLIENT_DEEP_CLEAN_GALLERY.map((photo, i) => ({
  src: photo.src,
  alt: photo.alt,
  caption:
    i === 0
      ? "Interior deep clean — luxury and daily drivers"
      : i === 1
        ? "Full cabin service at your location"
        : "Carpets, seats, and trim restored",
}));

const pillars = [
  {
    icon: Truck,
    title: "Fully mobile",
    text:
      "Water, power, and pro-grade tools arrive at your location — no shop drop-off required.",
  },
  {
    icon: Sparkles,
    title: "Premium products",
    text:
      "Professional detailing chemistry and methods chosen for results that last in Arizona heat.",
  },
  {
    icon: ShieldCheck,
    title: "Precision & care",
    text:
      "Every detail is inspected before we leave. Factory Fresh Results Guaranteed.",
  },
  {
    icon: Award,
    title: "Transparent packages",
    text:
      "Clear Refresh, Restore, and Reset options so you know what level of service you need.",
  },
];

export function AboutPageContent({
  aboutText,
  ownerPhotoUrl,
  teamGroupPhotoUrl,
}: {
  aboutText?: string;
  ownerPhotoUrl?: string;
  teamGroupPhotoUrl?: string;
}) {
  return (
    <div className="w-full min-w-0 space-y-14 md:space-y-20">
      <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
        <div className="mx-auto w-full max-w-xs lg:mx-0">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-gold/40 shadow-[0_0_40px_rgba(255,201,40,0.15)]">
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
        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed text-off-white/90">
            {aboutText?.trim() ||
              `${BRAND.name} is built on hands-on quality, honest recommendations, and factory-fresh results at your location — not a shop drop-off.`}
          </p>
          <p className="mt-6 leading-relaxed text-off-white/75">
            From maintenance Refresh details to full Reset restorations, paint
            refinement, ceramic protection, and engine bay cleaning, every job
            is treated with the same care we would want on our own vehicles.
          </p>
        </div>
      </div>

      <section aria-labelledby="about-team-heading" className="space-y-6">
        <div>
          <h2
            id="about-team-heading"
            className="font-display text-2xl text-bright-gold md:text-3xl"
          >
            Meet the team
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-off-white/70">
            Family owned and operated — the people behind every factory-fresh finish.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-gold/25">
          <div className="relative aspect-[4/5] w-full max-h-[min(70vh,560px)] sm:aspect-[16/10] sm:max-h-none md:aspect-[21/9]">
            <Image
              src={teamGroupPhotoUrl || CLIENT_IMAGES.teamGroup}
              alt="Thompson's Mobile Detailing AZ team at your service"
              fill
              className="object-cover object-[center_35%] sm:object-center"
              sizes="(max-width: 768px) 100vw, 1280px"
              priority
            />
          </div>
        </div>
      </section>

      <AboutShowcaseVideo index={0} poster={CLIENT_IMAGES.homeMobileVan} />

      <div className="relative aspect-[16/10] min-h-[200px] overflow-hidden rounded-3xl border border-gold/20 sm:aspect-[21/9]">
        <Image
          src={CLIENT_IMAGES.aboutEscalade}
          alt="Professional mobile detailing results on a luxury SUV"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="max-w-3xl">
        <p className="text-lg leading-relaxed text-off-white/90">
          {BRAND.name} provides professional mobile auto detailing throughout the
          Valley. We bring spotless water, power, professional equipment, and
          premium products directly to your home or workplace.
        </p>
        <p className="mt-6 leading-relaxed text-off-white/75">
          Our mission is to restore, protect, and maintain every vehicle with
          precision, professionalism, and attention to detail — from interior
          restoration and exterior detailing to paint correction and ceramic
          coatings. Every service is focused on exceptional results and making
          your vehicle look and feel its best.
        </p>
      </div>

      <AboutPhotoPair
        images={[
          {
            src: CLIENT_PORSCHE_GALLERY[1].src,
            alt: CLIENT_PORSCHE_GALLERY[1].alt,
          },
          {
            src: CLIENT_ESCALADE_GALLERY[0].src,
            alt: CLIENT_ESCALADE_GALLERY[0].alt,
          },
        ]}
      />

      <AboutShowcaseVideo
        index={1}
        poster={CLIENT_IMAGES.porscheShowcaseBright}
        aspectClassName={ABOUT_VIDEO_ASPECT}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((item) => (
          <article
            key={item.title}
            className="glass-panel rounded-2xl p-6 transition hover:border-gold/40"
          >
            <item.icon className="h-8 w-8 text-bright-gold" aria-hidden />
            <h2 className="mt-4 font-display text-xl text-bright-gold">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-off-white/75">
              {item.text}
            </p>
          </article>
        ))}
      </div>

      <AboutShowcaseVideo index={2} poster={CLIENT_IMAGES.baExteriorShowcase} />

      <section aria-labelledby="about-gallery-heading">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="about-gallery-heading"
              className="font-display text-2xl text-bright-gold md:text-3xl"
            >
              The Thompson&apos;s standard
            </h2>
            <p className="mt-2 max-w-xl text-sm text-off-white/70">
              A glimpse of how we work — mobile convenience, interior depth, and
              exterior excellence.
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {aboutPhotos.map((photo) => (
            <figure
              key={photo.src}
              className="group overflow-hidden rounded-2xl gold-border bg-navy/40"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent" />
              </div>
              <figcaption className="px-4 py-4 text-sm text-off-white/80">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="glass-panel rounded-2xl p-8">
          <h2 className="font-display text-2xl text-bright-gold">
            Service philosophy
          </h2>
          <ul className="mt-6 space-y-4 text-sm text-off-white/80">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bright-gold" />
              Treat every vehicle as if it were our own — no shortcuts on prep,
              process, or final inspection.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bright-gold" />
              Match the right package (Refresh, Restore, or Reset) to your
              vehicle&apos;s condition and your goals.
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bright-gold" />
              Communicate clearly on timing, pricing, and what to expect before
              we start.
            </li>
          </ul>
        </div>
        <div className="glass-panel rounded-2xl p-8">
          <h2 className="font-display text-2xl text-bright-gold">
            Valley-wide coverage
          </h2>
          <p className="mt-4 flex items-start gap-2 text-sm text-off-white/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            We serve customers across the Phoenix Metro and surrounding areas.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-off-white/70">
            {SERVICE_AREAS.slice(0, 10).join(" · ")} · and surrounding Valley
            areas.
          </p>
          <p className="mt-6 flex items-center gap-2 text-sm text-off-white/80">
            <Clock className="h-4 w-4 text-gold" />
            {BRAND.hours}
          </p>
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-royal/40 via-navy to-midnight border border-gold/20 px-8 py-12 text-center md:px-12">
        <p className="font-display text-2xl gold-gradient-text md:text-3xl">
          {BRAND.tagline}
        </p>
        <p className="mx-auto mt-4 max-w-lg text-sm text-off-white/75">
          Ready for factory-fresh results at your location? Book online or call{" "}
          {BRAND.phone}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/booking">Book Your Detail</Button>
          <Link
            href="/services"
            className="inline-flex items-center rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-off-white hover:bg-white/5"
          >
            View Services
          </Link>
        </div>
      </div>
    </div>
  );
}
