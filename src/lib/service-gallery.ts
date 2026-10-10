import { CLIENT_IMAGES, CLIENT_WHITE_INTERIOR_GALLERY } from "@/lib/client-images";
import { SERVICE_SLUG_IMAGES, SITE_IMAGES } from "@/lib/site-images";

const whiteInteriorExtras = CLIENT_WHITE_INTERIOR_GALLERY.slice(0, 2).map(
  (item) => item.src
);

const EXTRA_GALLERY: Record<string, string[]> = {
  "refresh-detail": [
    CLIENT_IMAGES.packageRefreshInterior,
    CLIENT_IMAGES.interiorWhiteLexusDashboard,
    CLIENT_IMAGES.interiorWhiteLexusFsport,
  ],
  "restore-detail": [
    CLIENT_IMAGES.packageRestoreInterior,
    ...whiteInteriorExtras,
  ],
  "reset-detail": [
    CLIENT_IMAGES.packageResetInterior,
    CLIENT_IMAGES.resetDetailHeroExterior,
    CLIENT_IMAGES.interiorWhiteLexusDashboard,
  ],
  "signature-foam-hand-wash": [
    CLIENT_IMAGES.porscheOutdoorFront,
    CLIENT_IMAGES.paintAfter,
    CLIENT_IMAGES.baExteriorShowcase,
  ],
  "recurring-maintenance-wash": [
    CLIENT_IMAGES.restoreDetailHeroExterior,
    CLIENT_IMAGES.baExteriorShowcase,
    CLIENT_IMAGES.porscheOutdoorFront,
  ],
  "ceramic-coating": [
    "/images/client/ceramic-coating-finish-alt.jpg",
    "/images/client/ceramic-coating-finish.jpg",
    CLIENT_IMAGES.porscheOutdoorFront,
  ],
  "paint-correction": [
    CLIENT_IMAGES.paintHoodBefore,
    CLIENT_IMAGES.paintHoodAfter,
    CLIENT_IMAGES.paintProcessFoam,
    CLIENT_IMAGES.paintProcessTrim,
    CLIENT_IMAGES.paintGlossDetail,
    CLIENT_IMAGES.paintAfter,
  ],
  "engine-bay-cleaning": [
    CLIENT_IMAGES.engineBefore,
    CLIENT_IMAGES.engineAfter,
    CLIENT_IMAGES.engineShowcase,
  ],
  "engine-bay-detail": [
    CLIENT_IMAGES.engineBefore,
    CLIENT_IMAGES.engineAfter,
    CLIENT_IMAGES.engineShowcase,
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

  const curated = EXTRA_GALLERY[slug];
  if (!curated) {
    fromDb.forEach((i) => {
      if (i.url !== heroImage) push(i.url, i.alt);
    });
  }

  const extras = curated ?? [
    SERVICE_SLUG_IMAGES[slug] ?? SITE_IMAGES.mobileVanSetup,
  ];
  extras.forEach((url, i) => {
    if (url !== heroImage) push(url, `${name} — detailing photo ${i + 1}`);
  });

  return out.slice(0, 5);
}
