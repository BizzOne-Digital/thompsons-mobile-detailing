"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type {
  ProcessMediaItem,
  ServiceProcessStory,
} from "@/lib/service-process-stories";
import { Button } from "@/components/ui/Button";

const MEDIA_CLASS =
  "object-cover object-center brightness-[1.05] contrast-[1.04] saturate-[1.05]";

function MediaCard({ item }: { item: ProcessMediaItem }) {
  const isProcess = item.phase === "process";

  return (
    <figure
      className={`relative overflow-hidden rounded-2xl border ${
        isProcess ? "border-white/15" : "border-bright-gold/35 shadow-[0_0_32px_rgba(255,201,40,0.12)]"
      }`}
    >
      <div className="relative aspect-[4/3] sm:aspect-[16/10]">
        {item.type === "video" ? (
          <video
            className={`absolute inset-0 h-full w-full ${MEDIA_CLASS}`}
            src={item.src}
            poster={item.poster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-label={item.alt}
          />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className={MEDIA_CLASS}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
            isProcess
              ? "bg-black/55 text-white/90"
              : "bg-bright-gold/90 text-midnight"
          }`}
        >
          {isProcess ? "Process" : "Finished"}
        </span>
      </div>
      {item.caption && (
        <figcaption className="border-t border-gold/10 bg-navy/40 px-4 py-3 text-sm text-off-white/75">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function ServiceProcessStorySection({
  story,
  serviceName,
  bookingHref,
}: {
  story: ServiceProcessStory;
  serviceName: string;
  bookingHref: string;
}) {
  const reduce = useReducedMotion();
  const processItems = story.items.filter((i) => i.phase === "process");
  const resultItems = story.items.filter((i) => i.phase === "result");

  return (
    <div className="space-y-14">
      <section>
        <h2 className="font-display text-xl text-bright-gold md:text-2xl">
          See the process
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-off-white/75 md:text-base">
          {story.processIntro}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {processItems.map((item, i) => (
            <motion.div
              key={`${item.src}-process-${i}`}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
            >
              <MediaCard item={item} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative rounded-3xl border border-gold/20 bg-gradient-to-b from-gold/5 to-transparent p-6 md:p-8">
        <div
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-bright-gold/50 to-transparent"
          aria-hidden
        />
        <h2 className="font-display text-xl text-bright-gold md:text-2xl">
          Finished results
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-off-white/80 md:text-base">
          {story.resultIntro}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {resultItems.map((item, i) => (
            <motion.div
              key={`${item.src}-result-${i}`}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            >
              <MediaCard item={item} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
          <Button href={bookingHref} className="w-full sm:w-auto">
            Book {serviceName}
          </Button>
          <p className="text-xs text-off-white/55 sm:max-w-xs sm:text-left">
            Ready when you are — we come to your home, office, or driveway across
            the Phoenix Metro.
          </p>
        </div>
      </section>
    </div>
  );
}
