"use client";

import { useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";

export type BeforeAfterItem = {
  _id: string;
  title: string;
  category: string;
  beforeImage: { url: string; alt?: string };
  afterImage: { url: string; alt?: string };
  caption?: string;
};

export function BeforeAfterSlider({ item }: { item: BeforeAfterItem }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="group relative overflow-hidden rounded-2xl gold-border">
      <div className="relative aspect-[16/10]">
        <SafeImage
          src={item.afterImage.url}
          alt={item.afterImage.alt || `${item.title} after`}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 50vw"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <SafeImage
            src={item.beforeImage.url}
            alt={item.beforeImage.alt || `${item.title} before`}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>
        <div
          className="absolute inset-y-0 w-1 bg-bright-gold shadow-[0_0_20px_rgba(255,201,40,0.8)]"
          style={{ left: `${position}%` }}
        />
        <input
          type="range"
          min={5}
          max={95}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`Compare before and after for ${item.title}`}
          className="absolute inset-0 z-10 w-full cursor-ew-resize opacity-0"
        />
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-sm">
        <span className="text-off-white/70">Before</span>
        <span className="font-medium text-bright-gold">{item.title}</span>
        <span className="text-off-white/70">After</span>
      </div>
    </div>
  );
}
