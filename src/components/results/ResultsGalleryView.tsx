"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import { RESULTS_GALLERY } from "@/lib/site-images";
import {
  CLIENT_BEFORE_AFTER_PAIRS,
  CLIENT_ENGINE_GALLERY,
  CLIENT_INTERIOR_GALLERY,
  CLIENT_WHITE_INTERIOR_GALLERY,
} from "@/lib/client-images";
import { BeforeAfterPairCard } from "@/components/home/BeforeAfterPairCard";
import { AutoplayShowcaseVideo } from "@/components/media/AutoplayShowcaseVideo";
import { CLIENT_VIDEOS } from "@/lib/client-videos";
import { Button } from "@/components/ui/Button";

type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export function ResultsGalleryView() {
  const [category, setCategory] = useState<GalleryCategory | "">("");

  const photos = useMemo(() => {
    if (!category) return [...RESULTS_GALLERY];
    return RESULTS_GALLERY.filter((p) => p.category === category);
  }, [category]);

  return (
    <div className="w-full min-w-0 space-y-12 md:space-y-16">
      <section>
        <h2 className="font-display text-2xl text-bright-gold md:text-3xl">
          Before & after transformations
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-off-white/70">
          Side-by-side results from real details — exterior washes, interior
          extraction, paint refinement, and full resets.
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {CLIENT_BEFORE_AFTER_PAIRS.map((item) => (
            <BeforeAfterPairCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl text-bright-gold">White interior details</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {CLIENT_WHITE_INTERIOR_GALLERY.map((img) => (
            <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold/20">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="50vw" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl text-bright-gold">Interior services</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLIENT_INTERIOR_GALLERY.map((img) => (
            <div key={img.src} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold/20">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="33vw" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl text-bright-gold">Engine bay cleaning</h2>
        <p className="mt-2 max-w-2xl text-sm text-off-white/70">
          Degrease, detail, and dress — factory-clean bays without the shop visit.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-gold/25">
          <AutoplayShowcaseVideo
            src={CLIENT_VIDEOS.engineBayCleaning}
            poster="/images/client/engine-12-after.jpg"
            aspectClassName="aspect-[21/9] min-h-[200px] md:min-h-[300px]"
            label="Engine bay cleaning in action"
          />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {CLIENT_ENGINE_GALLERY.map((img) => (
            <div key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold/20">
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="33vw" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl text-bright-gold">Ceramic protection</h2>
        <p className="mt-2 max-w-2xl text-sm text-off-white/70">
          Deep gloss, hydrophobic beading, and lasting defense against Arizona sun
          and contaminants.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-gold/25">
          <AutoplayShowcaseVideo
            src={CLIENT_VIDEOS.ceramicProtection}
            poster={CLIENT_VIDEOS.ceramicProtectionPoster}
            aspectClassName="aspect-[21/9] min-h-[200px] md:min-h-[300px]"
            label="Ceramic coating finish and protection"
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-gold/20">
            <Image
              src="/images/client/ceramic-coating-finish.jpg"
              alt="Ceramic coated paint finish with deep gloss"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-gold/20">
            <Image
              src="/images/client/ceramic-coating-finish-alt.jpg"
              alt="Close-up ceramic protection results on vehicle paint"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-2xl text-bright-gold md:text-3xl">
              Detailing gallery
            </h2>
            <p className="mt-2 max-w-xl text-sm text-off-white/70">
              Finished work across interiors, exteriors, paint, ceramic
              protection, and more — all mobile across the Phoenix Metro.
            </p>
          </div>
          <div className="-mx-4 flex w-full gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            <button
              type="button"
              onClick={() => setCategory("")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === ""
                  ? "bg-gradient-to-r from-soft-gold via-bright-gold to-gold text-midnight"
                  : "border border-gold/30 text-off-white/85 hover:border-gold/55"
              }`}
            >
              All
            </button>
            {GALLERY_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  category === c
                    ? "bg-gradient-to-r from-soft-gold via-bright-gold to-gold text-midnight font-medium"
                    : "border border-gold/30 text-off-white/85 hover:border-gold/55 hover:bg-gold/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <article
              key={photo.id}
              className={`group overflow-hidden rounded-2xl border border-gold/20 bg-navy/25 ${
                photo.featured ? "lg:col-span-1" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  photo.featured ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={photo.imageSrc}
                  alt={photo.imageAlt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent opacity-90"
                  aria-hidden
                />
                <span className="absolute left-4 top-4 rounded-full border border-gold/35 bg-black/45 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-bright-gold backdrop-blur-sm">
                  {photo.category}
                </span>
              </div>
              <div className="border-t border-gold/15 px-5 py-4">
                <h3 className="font-display text-lg text-off-white">
                  {photo.title}
                </h3>
              </div>
            </article>
          ))}
        </div>

        {photos.length === 0 && (
          <p className="mt-10 text-center text-off-white/60">
            No photos in this category yet.
          </p>
        )}
      </section>

      <section className="rounded-3xl border border-gold/25 bg-gradient-to-r from-royal/25 to-midnight px-8 py-10 text-center">
        <p className="font-display text-2xl gold-gradient-text">
          Want results like these on your vehicle?
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm text-off-white/75">
          Book a package or add-on — we bring everything to your location.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/booking">Book online</Button>
          <Button href="/pricing" variant="outline">
            View pricing
          </Button>
        </div>
      </section>
    </div>
  );
}
