import { SERVICE_SLUG_IMAGES, SITE_IMAGES } from "@/lib/site-images";

const EXTRA_GALLERY: Record<string, string[]> = {
  "refresh-detail": [
    SITE_IMAGES.interiorExtraction,
    SITE_IMAGES.foamWashArizona,
  ],
  "restore-detail": [
    SITE_IMAGES.carpetExtraction,
    SITE_IMAGES.suvFullDetail,
  ],
  "reset-detail": [
    SITE_IMAGES.carpetExtraction,
    SITE_IMAGES.interiorExtraction,
  ],
  "signature-foam-hand-wash": [
    SITE_IMAGES.foamWashArizona,
    SITE_IMAGES.mobileSunsetSedan,
  ],
  "ceramic-coating": [
    SITE_IMAGES.ceramicCoating,
    SITE_IMAGES.paintCorrection,
  ],
  "paint-correction": [
    SITE_IMAGES.paintCorrection,
    SITE_IMAGES.headlightRestoration,
  ],
};

export function buildServiceGallery(
  slug: string,
  name: string,
  heroImage: string,
  dbImages: { url?: string; alt?: string }[] = []
) {
  const fromDb = dbImages
    .filter((i) => i.url)
    .map((i) => ({ url: i.url!, alt: i.alt || name }));

  const seen = new Set<string>();
  const out: { url: string; alt: string }[] = [];

  const push = (url: string, alt: string) => {
    if (seen.has(url)) return;
    seen.add(url);
    out.push({ url, alt });
  };

  fromDb.forEach((i) => {
    if (i.url !== heroImage) push(i.url, i.alt);
  });

  const extras = EXTRA_GALLERY[slug] ?? [
    SERVICE_SLUG_IMAGES[slug] ?? SITE_IMAGES.mobileVanSetup,
    SITE_IMAGES.engineBay,
  ];
  extras.forEach((url, i) => {
    if (url !== heroImage) push(url, `${name} — detailing photo ${i + 1}`);
  });

  return out.slice(0, 3);
}
