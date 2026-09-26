"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { CLIENT_SPOTLIGHT_GALLERY } from "@/lib/client-images";
import { CLIENT_VIDEOS } from "@/lib/client-videos";
import { AutoplayShowcaseVideo } from "@/components/media/AutoplayShowcaseVideo";
import { SectionHeading } from "@/components/ui/SectionHeading";

const VIDEO_ASPECT =
  "aspect-[16/10] min-h-[200px] max-h-[min(50vh,420px)] sm:min-h-[240px]";

export function HomeAdditionalShowcase() {
  const reduce = useReducedMotion();

  return (
    <section
      className="border-y border-gold/15 bg-gradient-to-b from-navy/50 to-midnight py-16 md:py-20"
      aria-labelledby="home-showcase-extra-heading"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title="Exterior care & signature wash"
          subtitle="Foam, gloss, and protection — the same attention on every panel."
          align="center"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-2xl border border-gold/25"
          >
            <AutoplayShowcaseVideo
              src={CLIENT_VIDEOS.signatureFoamWash}
              poster={CLIENT_VIDEOS.signatureFoamWashPoster}
              aspectClassName={VIDEO_ASPECT}
              label="Signature foam hand wash"
            />
            <p className="border-t border-gold/20 bg-navy/70 px-4 py-3 text-center text-sm font-medium text-off-white">
              Signature foam hand wash
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="overflow-hidden rounded-2xl border border-gold/25"
          >
            <AutoplayShowcaseVideo
              src={CLIENT_VIDEOS.clip4080}
              poster="/images/client/vernon-09-porsche-side.jpg"
              aspectClassName={VIDEO_ASPECT}
              label="Exterior detailing in progress"
            />
            <p className="border-t border-gold/20 bg-navy/70 px-4 py-3 text-center text-sm font-medium text-off-white">
              Exterior detail &amp; gloss finish
            </p>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {CLIENT_SPOTLIGHT_GALLERY.map((item, i) => (
            <motion.figure
              key={item.src}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="group overflow-hidden rounded-2xl border border-gold/20 bg-navy/30"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <figcaption className="px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-bright-gold/90">
                {item.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-8 text-center">
          <Link
            href="/results"
            className="inline-flex items-center gap-2 text-sm font-semibold text-bright-gold hover:underline"
          >
            See more photos &amp; videos
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  );
}
