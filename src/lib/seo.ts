import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function buildMetadata({
  title,
  description,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const fullTitle = title
    ? `${title} | ${BRAND.name}`
    : `${BRAND.name} | ${BRAND.tagline}`;
  const desc = description || BRAND.headline;
  const url = `${siteUrl}${path}`;

  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: BRAND.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDetailing",
    name: BRAND.name,
    description: BRAND.headline,
    telephone: BRAND.phone,
    email: BRAND.email,
    areaServed: "Phoenix Metro, Arizona",
    openingHours: "Mo-Su 05:00-17:00",
  };
}
