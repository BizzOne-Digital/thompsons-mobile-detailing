import { CLIENT_IMAGES } from "@/lib/client-images";
import {
  VIDEOS7_CERAMIC,
  VIDEOS7_CLIP_C,
  VIDEOS7_ENGINE,
  VIDEOS7_INTERIOR,
  VIDEOS7_SIGNATURE_FOAM,
} from "@/lib/client-videos7.generated";
import {
  VIDEOS8_HOME_HERO,
  VIDEOS8_RECURRING_MAINTENANCE,
} from "@/lib/client-videos8";

export type ProcessMediaItem = {
  type: "image" | "video";
  phase: "process" | "result";
  src: string;
  poster?: string;
  alt: string;
  caption?: string;
};

export type ServiceProcessStory = {
  processIntro: string;
  resultIntro: string;
  items: ProcessMediaItem[];
};

const img = (
  src: string,
  alt: string,
  phase: "process" | "result",
  caption?: string
): ProcessMediaItem => ({
  type: "image",
  phase,
  src,
  alt,
  caption,
});

const vid = (
  src: string,
  poster: string,
  alt: string,
  phase: "process" | "result",
  caption?: string
): ProcessMediaItem => ({
  type: "video",
  phase,
  src,
  poster,
  alt,
  caption,
});

const STORIES: Record<string, ServiceProcessStory> = {
  "refresh-detail": {
    processIntro:
      "Every Refresh starts with how the vehicle looks today — dust, light buildup, and everyday wear.",
    resultIntro:
      "Then we deliver a maintenance-level reset: clean cabin, polished surfaces, and a refreshed feel.",
    items: [
      img(
        CLIENT_IMAGES.baInteriorBefore,
        "Interior before Refresh Detail maintenance cleaning",
        "process",
        "Starting condition"
      ),
      img(
        CLIENT_IMAGES.paintBefore,
        "Exterior paint before wash and light renewal",
        "process",
        "Exterior assessment"
      ),
      vid(
        VIDEOS8_HOME_HERO,
        CLIENT_IMAGES.homeHeroPoster,
        "Mobile detailing process — wash and interior care",
        "process",
        "On-site professional care"
      ),
      img(
        CLIENT_IMAGES.packageRefreshInterior,
        "White SUV interior after Refresh Detail",
        "result",
        "Refresh result"
      ),
      img(
        CLIENT_IMAGES.interiorWhiteLexusDashboard,
        "Clean dashboard and console after Refresh Detail",
        "result",
        "Interior finish"
      ),
    ],
  },
  "restore-detail": {
    processIntro:
      "Restore is for visible stains, embedded dirt, and interiors that need more than a light wipe-down.",
    resultIntro:
      "Deep shampoo, extraction, and conditioning bring carpets, leather, and trim back to life.",
    items: [
      img(
        CLIENT_IMAGES.baInteriorBefore,
        "Interior stains and buildup before Restore Detail",
        "process"
      ),
      vid(
        VIDEOS7_INTERIOR,
        CLIENT_IMAGES.deepClean15,
        "Deep interior cleaning and extraction in progress",
        "process",
        "Shampoo & extraction"
      ),
      img(
        CLIENT_IMAGES.packageRestoreInterior,
        "Red Charger interior after Restore Detail",
        "result",
        "Restored cabin"
      ),
      img(
        CLIENT_IMAGES.restoreDetailHeroExterior,
        "White Escalade exterior gloss after detailing",
        "result",
        "Exterior finish"
      ),
    ],
  },
  "reset-detail": {
    processIntro:
      "Reset tackles neglected interiors — heavy pet hair, odors, spills, and worn surfaces.",
    resultIntro:
      "Intensive extraction and restoration leave the cabin factory-fresh again.",
    items: [
      img(
        CLIENT_IMAGES.redLeatherBefore,
        "Pet hair and debris on seats before Reset Detail",
        "process",
        "Before reset"
      ),
      vid(
        VIDEOS7_INTERIOR,
        CLIENT_IMAGES.redLeatherBefore,
        "Pet hair removal and deep interior restoration",
        "process",
        "Pet hair & extraction"
      ),
      img(
        CLIENT_IMAGES.packageResetInterior,
        "BMW interior after Reset Detail restoration",
        "result",
        "Reset interior"
      ),
      img(
        CLIENT_IMAGES.resetDetailHeroExterior,
        "BMW exterior gloss after full Reset Detail",
        "result",
        "Finished vehicle"
      ),
    ],
  },
  "signature-foam-hand-wash": {
    processIntro:
      "Signature Foam Hand Wash safely lifts dirt and road film without harsh tunnel brushes.",
    resultIntro:
      "You get a glossy, protected finish with wheels, glass, and jambs done by hand.",
    items: [
      vid(
        VIDEOS7_CLIP_C,
        CLIENT_IMAGES.porscheOutdoorFront,
        "Signature foam hand wash in progress",
        "process",
        "Foam & hand wash"
      ),
      img(
        CLIENT_IMAGES.paintProcessFoam,
        "Foam application on vehicle paint",
        "process",
        "Safe foam prep"
      ),
      img(
        CLIENT_IMAGES.porscheOutdoorFront,
        "Porsche Cayenne after signature foam hand wash",
        "result",
        "Outdoor gloss finish"
      ),
      img(
        CLIENT_IMAGES.paintAfter,
        "Deep gloss exterior after hand wash and protection",
        "result",
        "Protected shine"
      ),
    ],
  },
  "recurring-maintenance-wash": {
    processIntro:
      "Maintenance washes keep your vehicle sharp between full details — same pro care on a regular schedule.",
    resultIntro:
      "Consistent hand washing preserves gloss and makes every full detail go further.",
    items: [
      vid(
        VIDEOS8_RECURRING_MAINTENANCE,
        CLIENT_IMAGES.restoreDetailHeroExterior,
        "Recurring maintenance wash at the customer location",
        "process",
        "Maintenance wash"
      ),
      img(
        CLIENT_IMAGES.aboutEscalade,
        "White Escalade during professional maintenance wash",
        "process",
        "On your driveway"
      ),
      img(
        CLIENT_IMAGES.restoreDetailHeroExterior,
        "White Escalade front end after maintenance wash",
        "result",
        "Crisp front finish"
      ),
      img(
        CLIENT_IMAGES.baExteriorShowcase,
        "Luxury SUV gloss after recurring maintenance program",
        "result",
        "Showroom shine"
      ),
    ],
  },
  "ceramic-coating": {
    processIntro:
      "Ceramic coating starts with corrected, decontaminated paint so protection bonds properly.",
    resultIntro:
      "The finish gains deep gloss, easier washes, and long-term UV and environmental defense.",
    items: [
      img(
        CLIENT_IMAGES.paintHoodBefore,
        "Paint surface before ceramic coating prep",
        "process",
        "Paint prep"
      ),
      vid(
        VIDEOS7_SIGNATURE_FOAM,
        CLIENT_IMAGES.paintHoodBefore,
        "Paint refinement before ceramic application",
        "process",
        "Refinement"
      ),
      vid(
        VIDEOS7_CERAMIC,
        "/images/client/ceramic-coating-finish.jpg",
        "Ceramic coating application and gloss development",
        "process",
        "Coating application"
      ),
      img(
        "/images/client/ceramic-coating-finish-alt.jpg",
        "Ceramic-coated paint with water beading and gloss",
        "result",
        "Ceramic gloss"
      ),
      img(
        CLIENT_IMAGES.porscheOutdoorFront,
        "Protected exterior finish after ceramic coating",
        "result",
        "Long-term protection"
      ),
    ],
  },
  "paint-correction": {
    processIntro:
      "Paint correction removes oxidation, swirls, and haze through measured machine polishing.",
    resultIntro:
      "Clarity and depth return — the finish people notice in Arizona sun.",
    items: [
      img(
        CLIENT_IMAGES.paintHoodBefore,
        "Oxidized hood paint before correction",
        "process",
        "Before correction"
      ),
      img(
        CLIENT_IMAGES.paintBefore,
        "Faded red paint before paint correction",
        "process",
        "Oxidation & swirls"
      ),
      vid(
        VIDEOS7_SIGNATURE_FOAM,
        CLIENT_IMAGES.paintProcessFoam,
        "Paint correction and refinement in progress",
        "process",
        "Machine polishing"
      ),
      img(
        CLIENT_IMAGES.paintHoodAfter,
        "Hood paint after correction and gloss restoration",
        "result",
        "Corrected hood"
      ),
      img(
        CLIENT_IMAGES.paintAfter,
        "Deep gloss red exterior after paint correction",
        "result",
        "Finished correction"
      ),
    ],
  },
  "pet-hair-removal": {
    processIntro:
      "Pet hair embeds in fabric and carpet — we treat seats, floors, cargo areas, and creases.",
    resultIntro:
      "Hair is lifted and extracted so the interior looks and feels clean again.",
    items: [
      img(
        CLIENT_IMAGES.redLeatherBefore,
        "Seats and carpet with embedded pet hair before service",
        "process",
        "Embedded pet hair"
      ),
      vid(
        VIDEOS7_INTERIOR,
        CLIENT_IMAGES.redLeatherBefore,
        "Interior pet hair removal and extraction",
        "process",
        "Removal process"
      ),
      img(
        CLIENT_IMAGES.redLeatherAfter,
        "Clean seats and carpet after pet hair removal",
        "result",
        "Hair-free interior"
      ),
      img(
        CLIENT_IMAGES.packageRefreshInterior,
        "Refreshed cabin after pet hair detail",
        "result",
        "Ready to enjoy"
      ),
    ],
  },
  "engine-bay-cleaning": {
    processIntro: "Engine bays collect grease, dust, and road grime that dull the whole presentation.",
    resultIntro: "Degreasing and careful detailing leave components clean and presentable.",
    items: [
      img(CLIENT_IMAGES.engineBefore, "Engine bay before cleaning", "process"),
      vid(
        VIDEOS7_ENGINE,
        CLIENT_IMAGES.engineBefore,
        "Engine bay cleaning process",
        "process"
      ),
      img(CLIENT_IMAGES.engineAfter, "Engine bay after detail", "result"),
      img(CLIENT_IMAGES.engineShowcase, "Showcase clean engine bay finish", "result"),
    ],
  },
  "engine-bay-detail": {
    processIntro: "Engine bays collect grease, dust, and road grime that dull the whole presentation.",
    resultIntro: "Degreasing and careful detailing leave components clean and presentable.",
    items: [
      img(CLIENT_IMAGES.engineBefore, "Engine bay before detail", "process"),
      img(CLIENT_IMAGES.engineShowcase, "Engine bay cleaning in progress", "process"),
      img(CLIENT_IMAGES.engineAfter, "Detailed engine bay after service", "result"),
      img(CLIENT_IMAGES.engineShowcase, "Finished engine bay presentation", "result"),
    ],
  },
};

export function getServiceProcessStory(
  slug: string
): ServiceProcessStory | null {
  return STORIES[slug] ?? null;
}
