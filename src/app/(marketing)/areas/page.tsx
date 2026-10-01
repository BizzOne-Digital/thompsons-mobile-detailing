import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageShell } from "@/components/layout/PageShell";
import {
  SERVICE_AREA_PAGES,
  serviceAreaPath,
} from "@/lib/service-areas";

export const metadata = buildMetadata({
  title: "Service Areas",
  description:
    "Mobile auto detailing across the Phoenix Metro — Avondale, Goodyear, Buckeye, Surprise, Glendale, Scottsdale, Chandler, and 20+ Valley cities. Book Refresh, Restore, or Reset online.",
  path: "/areas",
});

export default function ServiceAreasIndexPage() {
  return (
    <PageShell
      title="Phoenix Metro Service Areas"
      subtitle="We come to you — factory-fresh mobile detailing across the Valley."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_AREA_PAGES.map((area) => (
          <Link
            key={area.slug}
            href={serviceAreaPath(area.slug)}
            className="glass-panel rounded-2xl p-6 transition hover:border-gold/50"
          >
            <h2 className="font-semibold text-bright-gold">{area.name}, AZ</h2>
            <p className="mt-2 text-sm text-off-white/70 line-clamp-3">
              {area.description}
            </p>
            <span className="mt-4 inline-block text-sm text-bright-gold">
              View area page →
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
