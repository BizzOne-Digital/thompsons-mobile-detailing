"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronRight, Play, Volume2, VolumeX } from "lucide-react";
import { CLIENT_IMAGES } from "@/lib/client-images";
import { CLIENT_VIDEOS } from "@/lib/client-videos";

const VIDEO_SRC = CLIENT_VIDEOS.homeLiveFootage;

export function HomeLiveFootageSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [1.08, 1, 1.02]);
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const tryPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el || reduceMotion) return;
    try {
      await el.play();
      setPlaying(true);
      setNeedsTap(false);
    } catch {
      setNeedsTap(true);
      setPlaying(false);
    }
  }, [reduceMotion]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          el.pause();
          setPlaying(false);
          return;
        }
        if (!reduceMotion) tryPlay();
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion, tryPlay]);

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !muted;
    el.muted = next;
    setMuted(next);
    if (!next) tryPlay();
  };

  const handleTapToPlay = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = muted;
    tryPlay();
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden border-b border-gold/25 bg-midnight"
      aria-label="Live detailing footage"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-midnight via-midnight/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-midnight via-midnight/70 to-transparent" />

      <motion.div
        style={{ scale, y }}
        className="relative aspect-[16/10] w-full min-h-[min(56vw,520px)] sm:aspect-[21/9] sm:min-h-[min(42vw,640px)]"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover brightness-[1.08] contrast-[1.04]"
          src={VIDEO_SRC}
          poster={CLIENT_IMAGES.homeMobileVan}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/35"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,12,28,0.25)_100%)]"
          aria-hidden
        />

        <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-bright-gold backdrop-blur-md sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bright-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-bright-gold" />
              </span>
              Live from the field
            </span>
            {!playing && !reduceMotion && (
              <span className="text-xs text-white/70">Real mobile detailing in action</span>
            )}
          </motion.div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="max-w-xl"
            >
              <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
                See the{" "}
                <span className="gold-gradient-text">factory-fresh</span>{" "}
                process
              </h2>
              <p className="mt-2 text-sm text-white/80 md:text-base">
                Professional equipment, premium products, and precision — brought
                to your driveway across the Phoenix Metro.
              </p>
              <Link
                href="/booking"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-bright-gold backdrop-blur-sm transition hover:bg-gold/20"
              >
                Book your detail
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>

            <div className="flex items-center gap-2 self-end">
              {needsTap && (
                <button
                  type="button"
                  onClick={handleTapToPlay}
                  className="flex items-center gap-2 rounded-full border border-white/30 bg-black/50 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/65"
                >
                  <Play className="h-4 w-4 fill-current" aria-hidden />
                  Play video
                </button>
              )}
              <button
                type="button"
                onClick={toggleMute}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-black/55 text-bright-gold backdrop-blur-md transition hover:bg-black/70"
                aria-label={muted ? "Unmute video" : "Mute video"}
              >
                {muted ? (
                  <VolumeX className="h-5 w-5" aria-hidden />
                ) : (
                  <Volume2 className="h-5 w-5" aria-hidden />
                )}
              </button>
            </div>
          </div>
        </div>

        {reduceMotion && (
          <p className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-center text-xs text-white/60">
            Video playback reduced — enable motion in system settings to watch.
          </p>
        )}
      </motion.div>
    </section>
  );
}
