"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ChevronRight, Leaf, MapPin, Star } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { CLIENT_IMAGES } from "@/lib/client-images";
import { VIDEOS10_HOME_HERO } from "@/lib/client-videos10";
import type { PublicSiteSettings } from "@/lib/public-settings";

type HeroSectionProps = {
  settings: Pick<
    PublicSiteSettings,
    "heroMediaUrl" | "heroHeadline" | "heroSubheadline" | "heroDescription"
  >;
};

const HERO_MEDIA_CLASS =
  "absolute inset-0 h-full w-full object-cover object-center brightness-[1.1] contrast-[1.06] saturate-[1.1]";

const HERO_HEADLINE_SHADOW =
  "[text-shadow:0_2px_6px_rgba(0,0,0,0.92),0_4px_28px_rgba(0,0,0,0.72),0_0_2px_rgba(0,0,0,0.85)]";

const HERO_EYEBROW_SHADOW =
  "[text-shadow:0_1px_5px_rgba(0,0,0,0.92),0_2px_14px_rgba(0,0,0,0.7)]";

const HERO_SUPPORT_SHADOW =
  "[text-shadow:0_1px_4px_rgba(0,0,0,0.88),0_2px_14px_rgba(0,0,0,0.62)]";

const HERO_CITY_SHADOW =
  "[text-shadow:0_1px_5px_rgba(0,0,0,0.95),0_2px_16px_rgba(0,0,0,0.75)]";

/** Gold trust badges — stronger dark halo on bright foam frames */
const HERO_GOLD_SHADOW =
  "[text-shadow:0_1px_5px_rgba(0,0,0,0.95),0_2px_14px_rgba(0,0,0,0.82),0_0_1px_rgba(0,0,0,0.9)]";

const HERO_GOLD_ICON_SHADOW =
  "drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]";

export function HeroSection(_props: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const poster = CLIENT_IMAGES.homeHeroPoster;
  const useLiveVideo = !reduceMotion;

  const tryPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el || !useLiveVideo) return;
    el.muted = true;
    try {
      await el.play();
    } catch {
      /* placeholder remains until playback */
    }
  }, [useLiveVideo]);

  useEffect(() => {
    const el = videoRef.current;
    const root = sectionRef.current;
    if (!el || !root || !useLiveVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void tryPlay();
        else el.pause();
      },
      { threshold: 0.15 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [useLiveVideo, tryPlay]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] w-full overflow-hidden"
    >
      {useLiveVideo ? (
        <>
          <div
            className="absolute inset-0 bg-midnight"
            aria-hidden
          />
          <video
            ref={videoRef}
            className={`${HERO_MEDIA_CLASS} transition-opacity duration-700 ease-out ${
              videoVisible ? "opacity-100" : "opacity-0"
            }`}
            src={VIDEOS10_HOME_HERO}
            loop
            muted
            playsInline
            autoPlay
            preload="auto"
            onPlaying={() => setVideoVisible(true)}
            onCanPlay={() => {
              void tryPlay();
            }}
            aria-hidden
          />
        </>
      ) : (
        <Image
          src={poster}
          alt=""
          fill
          priority
          className={HERO_MEDIA_CLASS}
          sizes="100vw"
          aria-hidden
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/32 via-black/12 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-midnight/45 via-transparent to-black/8"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full min-w-0 max-w-7xl flex-col items-center justify-center px-4 pb-28 pt-[4.5rem] text-center sm:px-5 sm:pb-24 sm:pt-24 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="w-full max-w-2xl"
        >
          <p
            className={`-translate-y-2 text-sm font-extrabold uppercase tracking-[0.3em] text-bright-gold sm:-translate-y-2.5 sm:text-base sm:tracking-[0.38em] md:text-lg md:tracking-[0.42em] ${HERO_EYEBROW_SHADOW}`}
          >
            5-Star Mobile Auto Detailing
          </p>

          <h1
            className={`mt-1.5 font-display text-[1.85rem] font-bold uppercase leading-[1.08] tracking-[0.02em] text-white sm:mt-2 sm:text-[2.35rem] md:text-5xl lg:text-[3.15rem] ${HERO_HEADLINE_SHADOW}`}
          >
            <span className="block">Factory Fresh</span>
            <span className="block">Results Guaranteed</span>
          </h1>

          <p
            className={`mx-auto mt-2.5 max-w-md px-1 text-sm font-medium leading-snug text-white sm:mt-3 sm:text-[15px] md:max-w-lg ${HERO_SUPPORT_SHADOW}`}
          >
            {BRAND.heroSupportingLine}
          </p>

          <div className="mt-4 flex flex-col items-center gap-2.5 sm:mt-5">
            <ul
              className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-bright-gold sm:gap-x-7 sm:text-sm md:text-[15px] ${HERO_GOLD_SHADOW}`}
            >
              <li className="flex items-center gap-2">
                <Star
                  className={`h-4 w-4 fill-bright-gold text-bright-gold sm:h-[1.125rem] sm:w-[1.125rem] ${HERO_GOLD_ICON_SHADOW}`}
                />
                Fully Mobile — We Come to You
              </li>
              <li className="hidden h-4 w-px bg-gold/45 sm:block" aria-hidden />
              <li className="flex items-center gap-2">
                <Calendar
                  className={`h-4 w-4 text-bright-gold sm:h-[1.125rem] sm:w-[1.125rem] ${HERO_GOLD_ICON_SHADOW}`}
                />
                Open 7 Days
              </li>
            </ul>
            <p
              className={`flex items-center justify-center gap-2 text-xs font-semibold text-bright-gold sm:text-sm md:text-[15px] ${HERO_GOLD_SHADOW}`}
            >
              <Leaf
                className={`h-4 w-4 text-bright-gold sm:h-[1.125rem] sm:w-[1.125rem] ${HERO_GOLD_ICON_SHADOW}`}
              />
              Premium Products
            </p>
          </div>

          <div className="mt-6 flex w-full max-w-sm flex-col gap-3 sm:mx-auto sm:mt-7 sm:max-w-md sm:gap-3.5">
            <Link
              href="/booking"
              className="hero-cta-primary w-full justify-center"
            >
              Book Your Detail
              <ChevronRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              href="/pricing"
              className="hero-cta-secondary w-full justify-center"
            >
              View Packages
              <ChevronRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>

          <div
            className={`mt-6 flex max-w-md flex-col items-center gap-2 sm:mx-auto sm:max-w-lg ${HERO_CITY_SHADOW}`}
          >
            <MapPin
              className={`h-5 w-5 shrink-0 text-bright-gold sm:h-6 sm:w-6 ${HERO_GOLD_ICON_SHADOW}`}
              aria-hidden
            />
            {BRAND.heroServiceAreaRows.map((row) => (
              <p
                key={row.join("-")}
                className="text-center text-xs leading-relaxed text-white/95 sm:text-sm"
              >
                {row.join(" • ")}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
