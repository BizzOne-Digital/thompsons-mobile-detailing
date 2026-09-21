import type { Metadata } from "next";
import { BRAND } from "@/lib/constants";
import { CLIENT_IMAGES } from "@/lib/client-images";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
