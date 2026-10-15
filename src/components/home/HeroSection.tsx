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

/** Mockup: soft dark shadow on white serif headline over bright foam video */
const HERO_HEADLINE_SHADOW =
  "[text-shadow:0_2px_6px_rgba(0,0,0,0.92),0_4px_28px_rgba(0,0,0,0.72),0_0_2px_rgba(0,0,0,0.85)]";

const HERO_EYEBROW_SHADOW =
  "[text-shadow:0_1px_4px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.55)]";

const HERO_SUPPORT_SHADOW =
  "[text-shadow:0_1px_4px_rgba(0,0,0,0.88),0_2px_14px_rgba(0,0,0,0.62)]";

const HERO_CITY_SHADOW =
  "[text-shadow:0_1px_4px_rgba(0,0,0,0.9),0_2px_12px_rgba(0,0,0,0.65)]";

export function HeroSection(_props: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const poster = CLIENT_IMAGES.homeHeroPoster;
  const useLiveVideo = !reduceMotion;

  const tryPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el || !useLiveVideo) return;
    el.muted = true;
    try {
      await el.play();
    } catch {
      /* poster remains visible */
    }
  }, [useLiveVideo]);

  useEffect(() => {
    const el = videoRef.current;
    const root = sectionRef.current;
    if (!el || !root || !useLiveVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
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
      <Image
        src={poster}
        alt=""
        fill
        priority
        className={HERO_MEDIA_CLASS}
        sizes="100vw"
        aria-hidden
      />
      {useLiveVideo && (
        <video
          ref={videoRef}
          className={`${HERO_MEDIA_CLASS} transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          src={VIDEOS10_HOME_HERO}
          poster={poster}
          loop
          muted
          playsInline
          autoPlay
          preload="metadata"
          onLoadedData={() => {
            setVideoReady(true);
            void tryPlay();
          }}
          onCanPlay={() => {
            setVideoReady(true);
            void tryPlay();
          }}
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

      <div className="relative mx-auto flex min-h-[100svh] w-full min-w-0 max-w-7xl flex-col items-center justify-center px-4 pb-28 pt-24 text-center sm:px-5 sm:pb-24 sm:pt-28 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="w-full max-w-2xl"
        >
          <p
            className={`-translate-y-1 text-[13px] font-extrabold uppercase tracking-[0.28em] text-bright-gold sm:text-sm sm:tracking-[0.36em] md:text-[15px] md:tracking-[0.4em] ${HERO_EYEBROW_SHADOW}`}
          >
            5-Star Mobile Auto Detailing
          </p>

          <h1
            className={`mt-2 font-display text-[1.85rem] font-bold uppercase leading-[1.08] tracking-[0.02em] text-white sm:mt-2.5 sm:text-[2.35rem] md:text-5xl lg:text-[3.15rem] ${HERO_HEADLINE_SHADOW}`}
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
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-semibold text-bright-gold sm:gap-x-6 sm:text-xs md:text-sm"
            >
              <li className="flex items-center gap-1.5 sm:gap-2">
                <Star className="h-3.5 w-3.5 fill-bright-gold text-bright-gold sm:h-4 sm:w-4" />
                Fully Mobile — We Come to You
              </li>
              <li className="hidden h-3.5 w-px bg-gold/45 sm:block" aria-hidden />
              <li className="flex items-center gap-1.5 sm:gap-2">
                <Calendar className="h-3.5 w-3.5 text-bright-gold sm:h-4 sm:w-4" />
                Open 7 Days
              </li>
            </ul>
            <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-bright-gold sm:gap-2 sm:text-xs md:text-sm">
              <Leaf className="h-3.5 w-3.5 text-bright-gold sm:h-4 sm:w-4" />
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

          <p
            className={`mt-5 flex max-w-sm items-start justify-center gap-2 text-center text-[11px] leading-relaxed text-white/90 sm:mx-auto sm:max-w-md sm:text-left sm:text-xs ${HERO_CITY_SHADOW}`}
          >
            <MapPin
              className={`mx-auto mt-0.5 h-4 w-4 shrink-0 text-bright-gold drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] sm:mx-0`}
              aria-hidden
            />
            <span className={HERO_CITY_SHADOW}>{BRAND.heroServiceAreaLine}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
