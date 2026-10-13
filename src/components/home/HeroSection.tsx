"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  Leaf,
  MapPin,
  Star,
} from "lucide-react";
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

export function HeroSection({ settings }: HeroSectionProps) {
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
        className="absolute inset-0 bg-gradient-to-r from-black/28 via-black/10 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-midnight/40 via-transparent to-black/5"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full min-w-0 max-w-7xl flex-col items-center justify-center px-4 pb-28 pt-24 text-center sm:px-5 sm:pb-24 sm:pt-28 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="w-full max-w-3xl"
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] text-bright-gold sm:text-sm sm:tracking-[0.28em] [text-shadow:0_0_24px_rgba(255,201,40,0.65),0_0_48px_rgba(255,201,40,0.35)]"
          >
            5-Star Mobile Auto Detailing
          </p>

          <h1 className="mt-2 max-w-full break-words font-display text-[1.65rem] font-bold leading-[1.08] tracking-tight sm:mt-3 sm:text-4xl md:text-[2.75rem] lg:text-5xl">
            <span
              className="block text-white [text-shadow:0_0_28px_rgba(255,201,40,0.45),0_2px_12px_rgba(0,0,0,0.5)]"
            >
              {settings.heroHeadline}
            </span>
            <span
              className="mt-0.5 block bg-gradient-to-r from-soft-gold via-bright-gold to-gold bg-clip-text text-transparent [filter:drop-shadow(0_0_22px_rgba(255,201,40,0.55))]"
            >
              {settings.heroSubheadline}
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm font-medium leading-snug text-white/90 sm:mt-4 sm:text-base sm:whitespace-nowrap">
            {settings.heroDescription}
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-bright-gold">
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-bright-gold text-bright-gold" />
              Fully Mobile — We Come to You
            </li>
            <li className="hidden h-4 w-px bg-gold/40 sm:block" aria-hidden />
            <li className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-bright-gold" />
              Open 7 Days
            </li>
            <li className="hidden h-4 w-px bg-gold/40 sm:block" aria-hidden />
            <li className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-bright-gold" />
              Premium Products
            </li>
          </ul>

          <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:mx-auto sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link href="/booking" className="hero-cta-primary w-full justify-center sm:w-auto">
              Book Your Detail
              <ChevronRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link href="/pricing" className="hero-cta-secondary w-full justify-center sm:w-auto">
              View Packages
              <ChevronRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </motion.div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="relative mt-10 flex max-w-full items-start gap-2 text-xs text-white/75 sm:absolute sm:bottom-8 sm:left-4 sm:mt-0 sm:max-w-xl md:left-8 md:text-sm"
        >
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bright-gold" />
          <span>
            Avondale • Litchfield Park • Goodyear • Buckeye • Surprise • Sun
            City & the West Valley
          </span>
        </motion.p>
      </div>
    </section>
  );
}
