import Link from "next/link";
import { BRAND } from "@/lib/constants";
import type { ServiceAreaPage } from "@/lib/service-areas";
import {
  SERVICE_AREA_PAGES,
  serviceAreaPath,
} from "@/lib/service-areas";
import { Button } from "@/components/ui/Button";

export function AreaDetailContent({
  area,
}: {
  area: ServiceAreaPage;
}) {
  const copy = area.copy;

  const nearby = copy.nearbySlugs
    .map((slug) => SERVICE_AREA_PAGES.find((a) => a.slug === slug))
    .filter(Boolean) as ServiceAreaPage[];

  return (
    <div className="mx-auto max-w-3xl space-y-10 text-off-white/85">
      {copy.intro.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="text-lg leading-relaxed">
          {paragraph}
        </p>
      ))}

      <section>
        <h2 className="font-display text-2xl text-bright-gold">
          We come to you in {area.name}
        </h2>
        <p className="mt-4 leading-relaxed">{copy.mobileBlock}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={`/booking?city=${encodeURIComponent(area.name)}`}>
            Book mobile detailing in {area.name}
          </Button>
          <Button href="/services" variant="ghost">
            View all services
          </Button>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl text-bright-gold">
          {copy.interiorHeading}
        </h2>
        <p className="mt-4 leading-relaxed">{copy.interiorBody}</p>
        <ul className="mt-4 space-y-2 text-sm">
          {copy.interiorLinks.map((link) => (
            <li key={link.slug}>
              <Link
                href={`/services/${link.slug}`}
                className="text-bright-gold hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-2xl text-bright-gold">
          {copy.exteriorHeading}
        </h2>
        <p className="mt-4 leading-relaxed">{copy.exteriorBody}</p>
        <ul className="mt-4 space-y-2 text-sm">
          {copy.exteriorLinks.map((link) => (
            <li key={link.slug}>
              <Link
                href={`/services/${link.slug}`}
                className="text-bright-gold hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass-panel rounded-2xl border border-gold/20 p-6 md:p-8">
        <h2 className="font-display text-2xl text-bright-gold">
          Refresh, Restore &amp; Reset in {area.name}
        </h2>
        <p className="mt-2 text-sm text-off-white/60">
          Branded packages backed by the search terms customers use — interior
          detailing, full detail, and deeper restoration.
        </p>
        <div className="mt-6 space-y-5 text-sm leading-relaxed">
          <div>
            <Link
              href="/services/refresh-detail"
              className="font-semibold text-bright-gold hover:underline"
            >
              Refresh Detail
            </Link>
            <p className="mt-1 text-off-white/80">{copy.refreshBlurb}</p>
          </div>
          <div>
            <Link
              href="/services/restore-detail"
              className="font-semibold text-bright-gold hover:underline"
            >
              Restore Detail
            </Link>
            <p className="mt-1 text-off-white/80">{copy.restoreBlurb}</p>
          </div>
          <div>
            <Link
              href="/services/reset-detail"
              className="font-semibold text-bright-gold hover:underline"
            >
              Reset Detail
            </Link>
            <p className="mt-1 text-off-white/80">{copy.resetBlurb}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl text-bright-gold">
          Local work &amp; proof
        </h2>
        <p className="mt-4 leading-relaxed">{copy.localProof}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link href="/results" className="text-bright-gold hover:underline">
            Results gallery →
          </Link>
          <Link
            href="/testimonials"
            className="text-bright-gold hover:underline"
          >
            Customer reviews →
          </Link>
          <Link href="/blog" className="text-bright-gold hover:underline">
            Detailing tips &amp; blog →
          </Link>
        </div>
      </section>

      {nearby.length > 0 && (
        <section>
          <h2 className="font-display text-xl text-bright-gold">
            Nearby service areas
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3 text-sm">
            {nearby.map((n) => (
              <li key={n.slug}>
                <Link
                  href={serviceAreaPath(n.slug)}
                  className="rounded-full border border-gold/30 px-4 py-2 text-bright-gold hover:border-gold/60"
                >
                  {n.name}, AZ
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/areas" className="mt-4 inline-block text-sm hover:underline">
            All Phoenix Metro areas →
          </Link>
        </section>
      )}

      <p className="text-sm text-off-white/60">
        Questions about mobile car detailing in {area.name}? Call{" "}
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
