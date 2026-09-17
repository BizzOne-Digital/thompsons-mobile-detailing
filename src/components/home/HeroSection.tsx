"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ChevronRight, Leaf, MapPin, Star } from "lucide-react";
import { CLIENT_IMAGES } from "@/lib/client-images";
import { CLIENT_VIDEOS } from "@/lib/client-videos";
import type { PublicSiteSettings } from "@/lib/public-settings";

type HeroSectionProps = {
  introDone: boolean;
  settings: Pick<
    PublicSiteSettings,
    "heroMediaUrl" | "heroHeadline" | "heroSubheadline" | "heroDescription"
  >;
};

function isVideoMediaUrl(url: string) {
  return /\.(mp4|webm|mov)(\?|#|$)/i.test(url);
}

/** Old stock / placeholder heroes — never override the live Charger */
function isLegacyStockHero(url: string) {
  const u = url.toLowerCase();
  return (
    u.includes("unsplash") ||
    u.includes("mobile-sunset") ||
    u.includes("suv-full-detail") ||
    u.includes("foam-wash-arizona") ||
    u.includes("/images/hero") ||
    u.includes("hero-bg")
  );
}

function resolveHeroVideoSrc(heroMediaUrl: string) {
  const custom = heroMediaUrl.trim();
  if (custom && isVideoMediaUrl(custom) && !isLegacyStockHero(custom)) {
    return custom;
  }
  return CLIENT_VIDEOS.heroElectricBlueCharger;
}

const HERO_MEDIA_CLASS =
  "absolute inset-0 h-full w-full object-cover object-[center_48%] brightness-[1.06] contrast-[1.05] saturate-[1.08] sm:object-[center_42%] md:object-center";

export function HeroSection({ introDone, settings }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const poster = CLIENT_IMAGES.heroElectricBlueCharger;
  const videoSrc = resolveHeroVideoSrc(settings.heroMediaUrl ?? "");
  const useLiveVideo = !reduceMotion;

  const tryPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el || !useLiveVideo || !introDone) return;
    el.muted = true;
    try {
      await el.play();
    } catch {
      /* poster remains visible under video */
    }
  }, [useLiveVideo, introDone]);

  useEffect(() => {
    if (!useLiveVideo || !introDone) return;
    tryPlay();
  }, [useLiveVideo, introDone, tryPlay, videoReady]);

  useEffect(() => {
    const el = videoRef.current;
    const root = sectionRef.current;
    if (!el || !root || !useLiveVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && introDone) tryPlay();
        else el.pause();
      },
      { threshold: 0.15 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [useLiveVideo, introDone, tryPlay]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] w-full overflow-hidden"
    >
      {useLiveVideo ? (
        <>
          <Image
            src={poster}
            alt=""
            fill
            priority
            className={HERO_MEDIA_CLASS}
            sizes="100vw"
            aria-hidden
          />
          <video
            ref={videoRef}
            className={`${HERO_MEDIA_CLASS} transition-opacity duration-500 ${
              introDone && videoReady ? "opacity-100" : "opacity-0"
            }`}
            src={videoSrc}
            poster={poster}
            muted
            loop
            playsInline
            autoPlay={introDone}
            preload="auto"
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => {
              setVideoReady(true);
              if (introDone) tryPlay();
            }}
            aria-hidden
          />
        </>
      ) : (
        <Image
          src={poster}
          alt="Electric blue Dodge Charger after professional mobile detailing in Arizona"
          fill
          priority
          className={HERO_MEDIA_CLASS}
          sizes="100vw"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/45 to-black/15"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25"
        aria-hidden
      />
      <div className="page-hero-mesh absolute inset-0 opacity-25" aria-hidden />
      <div
        className="absolute inset-0 carbon-bg opacity-[0.08]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[100svh] w-full min-w-0 max-w-7xl flex-col justify-center px-4 pb-32 pt-28 sm:px-5 sm:pb-28 sm:pt-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="max-w-2xl"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-bright-gold sm:text-[11px] sm:tracking-[0.3em] md:text-xs md:tracking-[0.35em]">
            5-Star Mobile Auto Detailing
          </p>

          <h1 className="mt-4 max-w-full break-words font-display text-[2rem] font-bold leading-[1.05] tracking-tight sm:mt-5 sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-white">{settings.heroHeadline}</span>
            <span className="mt-1 block bg-gradient-to-r from-soft-gold via-bright-gold to-gold bg-clip-text text-transparent">
              {settings.heroSubheadline}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            {settings.heroDescription}
          </p>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-bright-gold">
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-bright-gold text-bright-gold" />
              Fully Mobile
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

          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
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
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="relative mt-10 flex max-w-full items-start gap-2 text-xs text-white/75 sm:absolute sm:bottom-8 sm:left-4 sm:mt-0 sm:max-w-xl md:left-8 md:text-sm"
        >
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bright-gold" />
          <span>
            Avondale • Phoenix • Scottsdale • Glendale • Peoria • The Valley
          </span>
        </motion.p>
      </div>
    </section>
  );
}
