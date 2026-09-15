"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HOME_GALLERY_STRIP } from "@/lib/site-images";

export function ImageShowcaseStrip() {
  const reduce = useReducedMotion();

  return (
    <section className="border-y border-gold/15 bg-black/30 py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.25em] text-bright-gold">
          Professional Mobile Detailing In Action
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_GALLERY_STRIP.map((item, i) => (
            <motion.figure
              key={item.src}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl gold-border"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-sm font-semibold text-white">
                  {item.label}
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
