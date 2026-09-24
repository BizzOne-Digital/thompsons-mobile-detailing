"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

type AutoplayShowcaseVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  aspectClassName?: string;
  label?: string;
  /** Show mute control (recommended for inline sections) */
  showControls?: boolean;
};

export function AutoplayShowcaseVideo({
  src,
  poster,
  className,
  aspectClassName = "aspect-[16/10] min-h-[220px]",
  label,
  showControls = true,
}: AutoplayShowcaseVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [muted, setMuted] = useState(true);
  const [needsTap, setNeedsTap] = useState(false);

  const tryPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el || reduceMotion) return;
    try {
      await el.play();
      setNeedsTap(false);
    } catch {
      setNeedsTap(true);
    }
  }, [reduceMotion]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          el.pause();
          return;
        }
        if (!reduceMotion) tryPlay();
      },
      { threshold: 0.25 }
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

  return (
    <div
      className={cn(
        "group relative w-full max-w-full min-w-0 overflow-hidden bg-black",
        aspectClassName,
        className
      )}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        aria-label={label}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
        aria-hidden
      />
      {showControls && (
        <div className="absolute bottom-3 right-3 z-10 flex gap-2">
          {needsTap && (
            <button
              type="button"
              onClick={() => tryPlay()}
              className="flex items-center gap-2 rounded-full border border-white/25 bg-black/55 px-3 py-2 text-xs font-medium text-white backdrop-blur-md"
            >
              <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
              Play
            </button>
          )}
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/35 bg-black/55 text-bright-gold backdrop-blur-md transition hover:bg-black/70"
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? (
              <VolumeX className="h-4 w-4" aria-hidden />
            ) : (
              <Volume2 className="h-4 w-4" aria-hidden />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
