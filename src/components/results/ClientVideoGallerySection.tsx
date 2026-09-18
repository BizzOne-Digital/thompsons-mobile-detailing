"use client";

import { CLIENT_VIDEO_GALLERY } from "@/lib/client-videos";
import { AutoplayShowcaseVideo } from "@/components/media/AutoplayShowcaseVideo";

export function ClientVideoGallerySection() {
  if (CLIENT_VIDEO_GALLERY.length === 0) return null;

  return (
    <section aria-labelledby="client-video-gallery-heading">
      <h2
        id="client-video-gallery-heading"
        className="font-display text-2xl text-bright-gold md:text-3xl"
      >
        Real job footage
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-off-white/70">
        Hand-picked clips from recent mobile appointments — we&apos;ll add more
        as Vernon shares new footage.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {CLIENT_VIDEO_GALLERY.map((clip) => (
          <div
            key={clip.src}
            className="overflow-hidden rounded-2xl border border-gold/25"
          >
            <AutoplayShowcaseVideo
              src={clip.src}
              aspectClassName="aspect-[16/10] min-h-[180px] max-h-[min(48vh,400px)]"
              label={clip.label}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
