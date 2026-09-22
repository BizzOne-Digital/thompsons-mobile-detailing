import type { Redirect } from "next/dist/lib/load-custom-routes";

/** Kept in sync with `service-areas.ts` — plain data for next.config (no path aliases). */
const AREA_SLUGS = [
  "avondale-az",
  "buckeye-az",
  "goodyear-az",
  "litchfield-park-az",
  "surprise-az",
  "phoenix-az",
  "scottsdale-az",
  "glendale-az",
  "peoria-az",
  "san-tan-valley-az",
  "gilbert-az",
  "mesa-az",
  "chandler-az",
];

const SERVICE_SLUGS = [
  "refresh-detail",
  "restore-detail",
  "reset-detail",
  "signature-foam-hand-wash",
  "recurring-maintenance-wash",
  "ceramic-coating",
  "paint-correction",
  "pet-hair-removal",
  "engine-bay-cleaning",
  "headlight-restoration",
  "exterior-trim-restoration",
  "interior-odor-treatment",
  "clay-bar-decontamination",
  "leather-seat-cleaning",
  "seat-and-carpet-cleaning",
];

function areaDest(slug: string) {
  return `/areas/${slug}`;
}

/** 301s from common old-site URL patterns → current routes */
export function buildLegacyRedirects(): Redirect[] {
  const redirects: Redirect[] = [
    { source: "/locations", destination: "/areas", permanent: true },
    { source: "/location", destination: "/areas", permanent: true },
    { source: "/service-areas", destination: "/areas", permanent: true },
    { source: "/service-area", destination: "/areas", permanent: true },
    { source: "/service-areas/:path*", destination: "/areas/:path*", permanent: true },
    { source: "/locations/:path*", destination: "/areas/:path*", permanent: true },
    { source: "/location/:path*", destination: "/areas/:path*", permanent: true },
  ];

  for (const slug of AREA_SLUGS) {
    const base = slug.replace(/-az$/, "");
    const patterns = [
      `/areas/${base}`,
      `/locations/${base}`,
      `/locations/${slug}`,
      `/location/${base}`,
      `/service-area/${base}`,
      `/service-areas/${base}`,
      `/mobile-detailing-${base}`,
      `/mobile-detailing-${slug}`,
      `/mobile-detailing-in-${base}`,
      `/mobile-detailing-in-${slug}`,
      `/${base}-mobile-detailing`,
      `/${base}-az-mobile-detailing`,
      `/${base}-mobile-detailing-az`,
    ];
    for (const source of patterns) {
      redirects.push({
        source,
        destination: areaDest(slug),
        permanent: true,
      });
    }
  }

  for (const slug of SERVICE_SLUGS) {
    redirects.push({
      source: `/${slug}`,
      destination: `/services/${slug}`,
      permanent: true,
    });
    redirects.push({
      source: `/services/${slug}/`,
      destination: `/services/${slug}`,
      permanent: true,
    });
  }

  redirects.push(
    { source: "/book", destination: "/booking", permanent: true },
    { source: "/book-now", destination: "/booking", permanent: true },
    { source: "/gallery", destination: "/results", permanent: true },
    { source: "/portfolio", destination: "/results", permanent: true }
  );

  return redirects;
}
