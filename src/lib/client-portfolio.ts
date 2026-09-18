/**
 * Exterior portfolio — grouped by vehicle / project (Vernon request).
 * Folder drop: public/images/portfolio/<project-slug>/
 * After new imports: node scripts/generate-client-portfolio-data.mjs
 */
import { CLIENT_IMAGES } from "@/lib/client-images";
import { CLIENT_VIDEOS } from "@/lib/client-videos";
import { GENERATED_EXTERIOR_PORTFOLIO } from "@/lib/client-portfolio-projects";
import type { ExteriorPortfolioProject } from "@/lib/client-portfolio-types";
import { FEATURED_PORTFOLIO_PROJECT_IDS } from "@/lib/client-media-curation";

export type {
  ExteriorPortfolioProject,
  PortfolioMedia,
} from "@/lib/client-portfolio-types";

/** Incoming folder convention: public/images/portfolio/<id>/… */
export const PORTFOLIO_INCOMING_ROOT = "/images/portfolio";

const FEATURED_LEGACY: ExteriorPortfolioProject[] = [
  {
    id: "electric-blue-charger",
    vehicle: "Electric Blue Dodge Charger",
    serviceLabel: "Exterior detail",
    caption:
      "Show-stopping gloss and clean lines — mobile service at the customer’s location.",
    coverSrc: CLIENT_IMAGES.heroElectricBlueCharger,
    media: [
      {
        type: "video",
        src: CLIENT_VIDEOS.heroElectricBlueCharger,
        poster: CLIENT_IMAGES.heroElectricBlueCharger,
        alt: "Electric blue Dodge Charger after detailing",
      },
      {
        type: "image",
        src: CLIENT_IMAGES.heroElectricBlueCharger,
        alt: "Electric blue Dodge Charger exterior finish",
      },
    ],
  },
  {
    id: "cadillac-escalade",
    vehicle: "Cadillac Escalade",
    serviceLabel: "Full exterior & luxury SUV detail",
    caption:
      "White Escalade brought back to a deep, even shine — grille, trim, and panels.",
    coverSrc: CLIENT_IMAGES.aboutEscalade,
    media: [
      {
        type: "image",
        src: "/images/client/vernon-19-escalade-front.jpg",
        alt: "Cadillac Escalade front after mobile detail",
      },
      {
        type: "image",
        src: "/images/client/vernon-18-escalade-angle.jpg",
        alt: "Cadillac Escalade three-quarter exterior finish",
      },
    ],
  },
  {
    id: "porsche-cayenne",
    vehicle: "Porsche Cayenne",
    serviceLabel: "Exterior gloss & paint refinement",
    caption:
      "Black Porsche exterior with corrected hood gloss and dialed-in finish.",
    coverSrc: CLIENT_IMAGES.porscheShowcaseBright,
    media: [
      {
        type: "image",
        src: "/images/client/vernon-13-porsche-front-outdoor.jpg",
        alt: "Porsche Cayenne outdoor exterior detail",
      },
      {
        type: "image",
        src: "/images/client/vernon-09-porsche-side.jpg",
        alt: "Porsche Cayenne side profile gloss",
      },
      {
        type: "image",
        src: "/images/client/vernon-10-porsche-rear.jpg",
        alt: "Porsche Cayenne rear exterior finish",
      },
      {
        type: "image",
        src: "/images/client/vernon-17-porsche-hood-gloss.jpg",
        alt: "Porsche hood after paint refinement",
      },
    ],
  },
  {
    id: "chevrolet-truck",
    vehicle: "Chevrolet truck",
    serviceLabel: "Tail light restoration",
    caption: "Oxidized lenses cleared and polished for a crisp, factory look.",
    coverSrc: "/images/client/vernon-07-taillight-after.jpg",
    media: [
      {
        type: "image",
        src: "/images/client/vernon-06-taillight-before.jpg",
        alt: "Truck taillight before restoration",
      },
      {
        type: "image",
        src: "/images/client/vernon-07-taillight-after.jpg",
        alt: "Truck taillight after restoration",
      },
    ],
  },
];

const legacyIds = new Set(FEATURED_LEGACY.map((p) => p.id));

export const CLIENT_EXTERIOR_PORTFOLIO: ExteriorPortfolioProject[] = [
  ...FEATURED_LEGACY,
  ...GENERATED_EXTERIOR_PORTFOLIO.filter((p) => !legacyIds.has(p.id)),
];

const featuredIdSet = new Set<string>(FEATURED_PORTFOLIO_PROJECT_IDS);

/** Curated for launch — expand ids in client-media-curation.ts when Vernon sends more */
export const CLIENT_EXTERIOR_PORTFOLIO_FEATURED: ExteriorPortfolioProject[] =
  FEATURED_PORTFOLIO_PROJECT_IDS.flatMap((id) => {
    const project = CLIENT_EXTERIOR_PORTFOLIO.find((p) => p.id === id);
    return project ? [project] : [];
  });
