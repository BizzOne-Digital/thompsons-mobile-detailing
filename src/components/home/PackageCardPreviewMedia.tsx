"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { PackageCardPreview } from "@/lib/client-videos8";

const MEDIA_CLASS =
  "absolute inset-0 h-full w-full object-cover object-center brightness-[1.06] contrast-[1.04] saturate-[1.06]";

export function PackageCardPreviewMedia({
  preview,
  label,
}: {
  preview: PackageCardPreview;
  label: string;
}) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduceMotion) return;
    el.muted = true;
    void el.play().catch(() => {});
  }, [reduceMotion, ready]);

  if (reduceMotion) {
    return (
      <Image
        src={preview.poster}
        alt={label}
        fill
        className={MEDIA_CLASS}
        sizes="(max-width:1024px) 100vw, 33vw"
      />
    );
  }

  return (
    <>
      <Image
        src={preview.poster}
        alt=""
        fill
        className={MEDIA_CLASS}
        sizes="(max-width:1024px) 100vw, 33vw"
        aria-hidden
      />
      <video
        ref={videoRef}
        className={`${MEDIA_CLASS} transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        src={preview.src}
        poster={preview.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        onLoadedData={() => setReady(true)}
        onCanPlay={() => setReady(true)}
        aria-label={label}
      />
    </>
  );
}
