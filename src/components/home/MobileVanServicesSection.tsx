import Image from "next/image";
import { Check } from "lucide-react";
import {
  CLIENT_IMAGES,
  MOBILE_VAN_SERVICES,
} from "@/lib/client-images";

export function MobileVanServicesSection() {
  return (
    <section className="border-b border-gold/20 bg-gradient-to-b from-navy/80 to-midnight py-12 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold/25 sm:aspect-[3/4] lg:aspect-auto lg:min-h-[420px]">
          <Image
            src={CLIENT_IMAGES.homeMobileVan}
            alt="Thompson's Mobile Detailing AZ fully equipped mobile detailing vehicle"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-bright-gold">
            Fully mobile
          </p>
          <h2 className="mt-3 font-display text-2xl text-off-white md:text-4xl">
            Services we bring to your driveway
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-off-white/75 md:text-base">
            We arrive with water, power, professional equipment, and premium
            products — factory-fresh results at your home, office, or preferred
            location across the Phoenix Metro.
          </p>
          <ul className="mt-8 space-y-3">
            {MOBILE_VAN_SERVICES.map((service) => (
              <li
                key={service}
                className="flex items-center gap-3 text-sm font-medium text-off-white/90 md:text-base"
              >
                <Check className="h-5 w-5 shrink-0 text-bright-gold" />
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
