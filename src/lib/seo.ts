import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import { CLIENT_IMAGES } from "@/lib/client-images";
import { SERVICE_AREA_PAGES } from "@/lib/service-areas";
import { getSiteUrl } from "@/lib/site-url";

const defaultShareImage = CLIENT_IMAGES.siteLinkShareImage;

/** Relative path — resolved via metadataBase in root layout */
function shareImagePath() {
  return defaultShareImage.startsWith("/")
    ? defaultShareImage
    : `/${defaultShareImage}`;
}

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
  const url = `${getSiteUrl()}${path}`;

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
      images: [
        {
          url: shareImagePath(),
          width: 1200,
          height: 630,
          alt: `${BRAND.name} — ${BRAND.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [shareImagePath()],
    },
  };
}

export function localBusinessJsonLd(options?: { pageUrl?: string }) {
  const base = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "AutoDetailing",
    "@id": `${base}/#organization`,
    name: BRAND.name,
    url: options?.pageUrl ?? base,
    description: BRAND.headline,
    telephone: BRAND.phone,
    email: BRAND.email,
    image: `${base}${shareImagePath()}`,
    areaServed: SERVICE_AREA_PAGES.map((a) => `${a.name}, AZ`),
    openingHours: "Mo-Su 05:00-17:00",
    priceRange: "$$",
  };
}
