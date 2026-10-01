import Link from "next/link";
import { BRAND } from "@/lib/constants";
import type { ServiceAreaPage } from "@/lib/service-areas";
import { Button } from "@/components/ui/Button";

type ServiceLink = { slug: string; name: string };

export function AreaDetailContent({
  area,
  services,
}: {
  area: ServiceAreaPage;
  services: ServiceLink[];
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-8 text-off-white/85">
      <p className="text-lg leading-relaxed">{area.description}</p>
      <p>
        We are fully mobile — water, power, and professional equipment come to
        your home, workplace, or approved location in {area.name}. Serving{" "}
        {area.name} and the greater Phoenix Metro with the same factory-fresh
        standard on every visit.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button href={`/booking?city=${encodeURIComponent(area.name)}`}>
          Book in {area.name}
        </Button>
        <Button href="/contact" variant="ghost">
          Contact us
        </Button>
      </div>
      {services.length > 0 && (
        <div>
          <h2 className="font-display text-xl text-bright-gold">
            Popular services in {area.name}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 8).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-bright-gold hover:underline"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/services" className="mt-4 inline-block text-sm hover:underline">
            View all services →
          </Link>
          <Link href="/areas" className="mt-2 block text-sm hover:underline">
            All service areas →
          </Link>
          <Link href="/blog" className="mt-2 block text-sm hover:underline">
            Detailing tips & blog →
          </Link>
        </div>
      )}
      <p className="text-sm text-off-white/60">
        Questions about coverage in {area.name}? Call{" "}
        <a href={BRAND.phoneHref} className="text-bright-gold hover:underline">
          {BRAND.phone}
        </a>{" "}
        or email{" "}
        <a
          href={`mailto:${BRAND.email}`}
          className="text-bright-gold hover:underline"
        >
          {BRAND.email}
        </a>
        .
      </p>
    </div>
  );
}
