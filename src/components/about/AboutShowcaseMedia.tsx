"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { AutoplayShowcaseVideo } from "@/components/media/AutoplayShowcaseVideo";
import { ABOUT_PAGE_VIDEOS } from "@/lib/client-videos";

type ShowcaseImage = { src: string; alt: string };

/** Consistent inline video sizing — avoids tall jumps on mobile */
export const ABOUT_VIDEO_ASPECT =
  "aspect-[16/10] min-h-[200px] max-h-[min(56vh,480px)] sm:min-h-[240px] sm:max-h-[min(52vh,520px)]";

function MediaFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-3xl border border-gold/25 shadow-[0_0_32px_rgba(255,201,40,0.08)]">
      {children}
    </div>
  );
}

export function AboutShowcaseVideo({
  index,
  poster,
  aspectClassName = ABOUT_VIDEO_ASPECT,
}: {
  index: 0 | 1 | 2;
  poster?: string;
  aspectClassName?: string;
}) {
  const clip = ABOUT_PAGE_VIDEOS[index] ?? ABOUT_PAGE_VIDEOS[0];
  return (
    <MediaFrame>
      <AutoplayShowcaseVideo
        src={clip.src}
        poster={poster}
        aspectClassName={aspectClassName}
        label={clip.label}
      />
    </MediaFrame>
  );
}

export function AboutPhotoPair({ images }: { images: [ShowcaseImage, ShowcaseImage] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((img) => (
        <MediaFrame key={img.src}>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </MediaFrame>
      ))}
    </div>
  );
}
