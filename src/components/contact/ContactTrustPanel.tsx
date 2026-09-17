import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CLIENT_IMAGES, CLIENT_SPOTLIGHT_GALLERY } from "@/lib/client-images";

export function ContactTrustPanel() {
  return (
    <aside className="space-y-6" aria-label="Why book with Thompson's">
      <div className="overflow-hidden rounded-2xl border border-gold/25">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={CLIENT_IMAGES.heroElectricBlueCharger}
            alt="Electric blue Dodge Charger after professional detailing"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent"
            aria-hidden
          />
          <p className="absolute bottom-0 left-0 right-0 p-4 text-sm font-medium text-white/90">
            Factory-fresh results at your location — fully mobile across the
            Valley.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {CLIENT_SPOTLIGHT_GALLERY.map((item) => (
          <div
            key={item.src}
            className="relative aspect-square overflow-hidden rounded-xl border border-gold/20"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="120px"
            />
          </div>
        ))}
      </div>

      <Link
        href="/results"
        className="inline-flex items-center gap-2 text-sm font-semibold text-bright-gold hover:underline"
      >
        Browse results gallery
        <ChevronRight className="h-4 w-4" aria-hidden />
      </Link>
    </aside>
  );
}
