import { SERVICE_SLUG_IMAGES, SITE_IMAGES } from "@/lib/site-images";

type ServiceImage = { url?: string; alt?: string };

export function resolveServiceCoverImage(
  slug: string,
  images: ServiceImage[] = []
) {
  const fromDb = images.find((i) => i.url)?.url;
  if (fromDb) return fromDb;
  return SERVICE_SLUG_IMAGES[slug] ?? SITE_IMAGES.mobileSunsetSedan;
}
