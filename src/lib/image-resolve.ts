import { SITE_IMAGES } from "@/lib/site-images";

/** Legacy disk paths from older templates — show a safe placeholder. */
export function resolveImageSrc(url?: string | null): string {
  if (!url) return SITE_IMAGES.mobileSunsetSedan;
  if (url.startsWith("/uploads/")) return SITE_IMAGES.mobileSunsetSedan;
  return url;
}
