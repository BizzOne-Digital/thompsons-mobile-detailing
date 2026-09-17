"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { CLIENT_IMAGES } from "@/lib/client-images";

/** Full-width Porsche tan interior — directly below Charger hero */
export function HomePorscheInteriorSection() {
  return (
    <section
      className="relative w-full overflow-hidden border-b border-gold/20 bg-midnight"
      aria-label="Porsche interior detailing results"
    >
      <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
        <Image
          src={CLIENT_IMAGES.porscheShowcaseBright}
          alt="Porsche Cayenne with tan interior after professional mobile detailing"
          fill
          priority
          className="object-cover object-[center_42%] brightness-[1.1] contrast-[1.06] saturate-[1.1]"
          sizes="100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-black/5 to-black/30"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/50 via-transparent to-black/15"
          aria-hidden
        />

        <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-8 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55 }}
            className="max-w-lg"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-bright-gold sm:text-xs">
              Interior craftsmanship
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Tan leather, factory-fresh finish
            </h2>
            <p className="mt-2 text-sm text-white/90 md:text-base">
              Deep cleaning and conditioning on premium cabins — every stitch and
              surface brought back to life.
            </p>
            <Link
              href="/services/restore-detail"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-bright-gold hover:underline"
            >
              Interior deep clean packages
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
