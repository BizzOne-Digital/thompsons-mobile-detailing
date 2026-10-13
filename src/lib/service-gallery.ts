import {
  CLIENT_IMAGES,
  RESET_ESCALADE_INTERIOR_STILLS,
  SIGNATURE_FOAM_BLACK_PORSCHE_STILLS,
  SIGNATURE_FOAM_ESCALADE_EXTERIOR_STILLS,
  SIGNATURE_FOAM_WHITE_PORSCHE_STILLS,
} from "@/lib/client-images";
import { SERVICE_SLUG_IMAGES, SITE_IMAGES } from "@/lib/site-images";

/** Curated galleries only — no extra vehicles on package / Signature Foam pages. */
const EXTRA_GALLERY: Record<string, string[]> = {
  "refresh-detail": [
    CLIENT_IMAGES.packageRefreshInterior,
    CLIENT_IMAGES.refreshTundraConsole,
    CLIENT_IMAGES.refreshTundraPassengerSeat,
    CLIENT_IMAGES.refreshTundraRearInterior,
    CLIENT_IMAGES.refreshTundraDriverDoor,
    CLIENT_IMAGES.refreshTundraExteriorFront,
    CLIENT_IMAGES.refreshTundraExteriorAngle,
  ],
  "restore-detail": [
    CLIENT_IMAGES.restoreChargerDaytonaDash,
    CLIENT_IMAGES.packageRestoreInterior,
    CLIENT_IMAGES.restoreChargerRearSeats,
    CLIENT_IMAGES.restoreChargerDashboard,
    CLIENT_IMAGES.restoreChargerCenterConsole,
    CLIENT_IMAGES.restoreChargerRearCabin,
    CLIENT_IMAGES.resetChargerEngineBay,
    CLIENT_IMAGES.resetChargerExteriorDriveway,
    CLIENT_IMAGES.resetChargerExteriorRear,
  ],
  "reset-detail": [
    CLIENT_IMAGES.resetEscaladeExteriorFront,
    CLIENT_IMAGES.resetEscaladeExteriorSide,
    ...RESET_ESCALADE_INTERIOR_STILLS.map((p) => p.src),
  ],
  "signature-foam-hand-wash": [
    CLIENT_IMAGES.porscheOutdoorFront,
    ...SIGNATURE_FOAM_WHITE_PORSCHE_STILLS.map((p) => p.src),
    ...SIGNATURE_FOAM_BLACK_PORSCHE_STILLS.map((p) => p.src),
    ...SIGNATURE_FOAM_ESCALADE_EXTERIOR_STILLS.map((p) => p.src),
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
    if (seen.has(url) || url === heroImage) return;
    seen.add(url);
    out.push({ url, alt });
  };

  const curated = EXTRA_GALLERY[slug];
  if (curated) {
    curated.forEach((url, i) => {
      push(url, `${name} — photo ${i + 1}`);
    });
    return out;
  }

  fromDb.forEach((i) => {
    if (i.url !== heroImage) push(i.url, i.alt);
  });

  const extras = [
    SERVICE_SLUG_IMAGES[slug] ?? SITE_IMAGES.mobileVanSetup,
  ];
  extras.forEach((url, i) => {
    if (url !== heroImage) push(url, `${name} — detailing photo ${i + 1}`);
  });

  return out.slice(0, 5);
}
