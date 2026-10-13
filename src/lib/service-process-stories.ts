import {
  CLIENT_IMAGES,
  CLIENT_ESCALADE_GALLERY,
  SIGNATURE_FOAM_BLACK_PORSCHE_STILLS,
  SIGNATURE_FOAM_ESCALADE_STILLS,
  SIGNATURE_FOAM_WHITE_PORSCHE_STILLS,
} from "@/lib/client-images";
import { SERVICE_PROCESS_FEATURED_VIDEO } from "@/lib/service-hero-media";

export type ProcessMediaItem = {
  type: "image";
  phase: "process" | "result";
  src: string;
  alt: string;
  caption?: string;
};

export type ServiceProcessStory = {
  processIntro: string;
  resultIntro: string;
  /** One short clip per service — remaining media are stills of the same vehicle. */
  featuredVideo?: { src: string; poster: string; alt: string };
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

const STORIES: Record<string, Omit<ServiceProcessStory, "featuredVideo">> = {
  "refresh-detail": {
    processIntro:
      "Same blue Toyota Tundra throughout — light daily use, factory-fresh cabin, and a protected exterior finish.",
    resultIntro:
      "Finished interior and outdoor gloss on the same truck — maintenance-level Refresh Detail.",
    items: [
      img(
        CLIENT_IMAGES.packageRefreshInterior,
        "Toyota Tundra driver cabin after Refresh Detail",
        "process",
        "Dashboard & steering wheel"
      ),
      img(
        CLIENT_IMAGES.refreshTundraConsole,
        "Tundra center console and TRD trim after refresh",
        "process",
        "Center console"
      ),
      img(
        CLIENT_IMAGES.refreshTundraPassengerSeat,
        "Tundra passenger seat and door panel after refresh",
        "process",
        "Seats & trim"
      ),
      img(
        CLIENT_IMAGES.refreshTundraRearInterior,
        "Tundra rear cabin after Refresh Detail",
        "process",
        "Rear interior"
      ),
      img(
        CLIENT_IMAGES.refreshTundraDriverDoor,
        "Tundra driver entry and carpet after refresh",
        "process",
        "Carpet & entry"
      ),
      img(
        CLIENT_IMAGES.refreshTundraExteriorFront,
        "Blue Tundra front finish after mobile detail",
        "result",
        "Outdoor gloss"
      ),
      img(
        CLIENT_IMAGES.refreshTundraExteriorAngle,
        "Blue Tundra exterior angle after Refresh Detail",
        "result",
        "Protected shine"
      ),
    ],
  },
  "restore-detail": {
    processIntro:
      "Same red Dodge Charger throughout — stains, grime, and worn plastics brought back to factory-fresh.",
    resultIntro:
      "Deep-cleaned leather, carpets, and trim on the same vehicle after Restore Detail.",
    items: [
      img(
        CLIENT_IMAGES.restoreChargerDaytonaDash,
        "Dodge Charger dash and Daytona trim after Restore Detail",
        "process",
        "Dashboard & vents"
      ),
      img(
        CLIENT_IMAGES.packageRestoreInterior,
        "Charger driver seat and steering wheel after restore",
        "process",
        "Driver cabin"
      ),
      img(
        CLIENT_IMAGES.restoreChargerRearSeats,
        "Charger rear leather after shampoo and conditioning",
        "process",
        "Rear seats"
      ),
      img(
        CLIENT_IMAGES.restoreChargerDashboard,
        "Charger instrument panel and console after restore",
        "result",
        "Finished dash"
      ),
      img(
        CLIENT_IMAGES.restoreChargerCenterConsole,
        "Charger center stack and shifter after Restore Detail",
        "result",
        "Center console"
      ),
      img(
        CLIENT_IMAGES.restoreChargerRearCabin,
        "Charger rear cabin and headliner after Restore Detail",
        "result",
        "Factory-fresh interior"
      ),
    ],
  },
  "reset-detail": {
    processIntro:
      "Same red Dodge Charger — maximum effort for neglected interiors, odors, and severe buildup.",
    resultIntro:
      "Intensive restoration on the same vehicle — engine bay, exterior, and cabin reset.",
    items: [
      img(
        CLIENT_IMAGES.resetChargerEngineBay,
        "Charger HEMI engine bay after Reset-level cleaning",
        "process",
        "Engine bay detail"
      ),
      img(
        CLIENT_IMAGES.resetChargerExteriorDriveway,
        "Red Charger after full Reset Detail — driveway finish",
        "result",
        "Finished exterior"
      ),
      img(
        CLIENT_IMAGES.resetChargerExteriorRear,
        "Red Charger rear quarter gloss after Reset Detail",
        "result",
        "Protected shine"
      ),
    ],
  },
  "signature-foam-hand-wash": {
    processIntro:
      "Watch the white Porsche Cayenne clip above, then scroll process stills — white Porsche first, then a black Porsche garage hand wash.",
    resultIntro:
      "Finished exteriors on the white and black Cadillac Escalades, plus the black Escalade’s white leather interior — each caption names the vehicle.",
    items: [
      img(
        SIGNATURE_FOAM_WHITE_PORSCHE_STILLS[0].src,
        SIGNATURE_FOAM_WHITE_PORSCHE_STILLS[0].alt,
        "process",
        SIGNATURE_FOAM_WHITE_PORSCHE_STILLS[0].caption
      ),
      img(
        SIGNATURE_FOAM_WHITE_PORSCHE_STILLS[1].src,
        SIGNATURE_FOAM_WHITE_PORSCHE_STILLS[1].alt,
        "result",
        SIGNATURE_FOAM_WHITE_PORSCHE_STILLS[1].caption
      ),
      ...SIGNATURE_FOAM_BLACK_PORSCHE_STILLS.map((photo) =>
        img(photo.src, photo.alt, "process", photo.caption)
      ),
      ...SIGNATURE_FOAM_ESCALADE_STILLS.map((photo) =>
        img(photo.src, photo.alt, "result", photo.caption)
      ),
    ],
  },
  "recurring-maintenance-wash": {
    processIntro:
      "Recurring maintenance is built around your white Escalade — same vehicle, same pro standard every visit.",
    resultIntro:
      "Consistent gloss between full details — the hero video above shows the wash; stills are the same SUV.",
    items: [
      img(
        CLIENT_IMAGES.aboutEscalade,
        "White Escalade before maintenance wash",
        "process",
        "On your driveway"
      ),
      img(
        CLIENT_IMAGES.restoreDetailHeroExterior,
        "Escalade front end during maintenance wash",
        "process",
        "Hand wash"
      ),
      img(
        CLIENT_ESCALADE_GALLERY[1].src,
        "White Escalade after maintenance wash",
        "result",
        "Crisp front finish"
      ),
      img(
        CLIENT_IMAGES.baExteriorShowcase,
        "Escalade gloss after recurring maintenance",
        "result",
        "Showroom shine"
      ),
    ],
  },
  "ceramic-coating": {
    processIntro:
      "Ceramic coating on this Porsche Cayenne — prep, correction, and protection on one paint finish.",
    resultIntro:
      "Deep gloss and beading on the same exterior — easier washes for months to come.",
    items: [
      img(
        CLIENT_IMAGES.porscheOutdoorFront,
        "Porsche exterior before ceramic prep",
        "process",
        "Paint prep"
      ),
      img(
        CLIENT_IMAGES.porscheOutdoorFront,
        "Porsche paint during ceramic prep and refinement",
        "process",
        "Surface correction"
      ),
      img(
        "/images/client/ceramic-coating-finish-alt.jpg",
        "Ceramic-coated Porsche with water beading",
        "result",
        "Ceramic gloss"
      ),
      img(
        CLIENT_IMAGES.porscheOutdoorFront,
        "Protected Porsche exterior after ceramic coating",
        "result",
        "Long-term protection"
      ),
    ],
  },
  "paint-correction": {
    processIntro:
      "Paint correction on this red Charger — oxidation, swirls, and haze on one paint finish.",
    resultIntro:
      "Clarity and depth on the same vehicle — what Arizona sun is meant to show off.",
    items: [
      img(
        CLIENT_IMAGES.paintBefore,
        "Oxidized red paint before correction",
        "process",
        "Before correction"
      ),
      img(
        CLIENT_IMAGES.paintHoodBefore,
        "Hood oxidation before machine polishing",
        "process",
        "Swirls & haze"
      ),
      img(
        CLIENT_IMAGES.paintHoodAfter,
        "Hood after paint correction",
        "result",
        "Corrected hood"
      ),
      img(
        CLIENT_IMAGES.paintAfter,
        "Red Charger exterior after paint correction",
        "result",
        "Finished correction"
      ),
    ],
  },
  "pet-hair-removal": {
    processIntro:
      "Pet hair removal on this interior — seats, carpet, and cargo on one vehicle.",
    resultIntro:
      "The same cabin after extraction — hair lifted and surfaces refreshed.",
    items: [
      img(
        CLIENT_IMAGES.redLeatherBefore,
        "Seats and carpet with embedded pet hair",
        "process",
        "Before"
      ),
      img(
        CLIENT_IMAGES.redLeatherBefore,
        "Pet hair removal in progress",
        "process",
        "Extraction"
      ),
      img(
        CLIENT_IMAGES.redLeatherAfter,
        "Clean seats after pet hair removal",
        "result",
        "Hair-free interior"
      ),
      img(
        CLIENT_IMAGES.redLeatherAfter,
        "Refreshed carpet and leather after pet hair service",
        "result",
        "Finished cabin"
      ),
    ],
  },
  "engine-bay-cleaning": {
    processIntro: "One engine bay — grease, dust, and grime before professional degreasing.",
    resultIntro: "The same bay cleaned, detailed, and ready to show.",
    items: [
      img(CLIENT_IMAGES.engineBefore, "Engine bay before cleaning", "process"),
      img(CLIENT_IMAGES.engineShowcase, "Engine bay cleaning in progress", "process"),
      img(CLIENT_IMAGES.engineAfter, "Engine bay after cleaning", "result"),
      img(CLIENT_IMAGES.engineShowcase, "Finished engine bay", "result"),
    ],
  },
  "engine-bay-detail": {
    processIntro: "One engine bay — grease, dust, and grime before professional degreasing.",
    resultIntro: "The same bay cleaned, detailed, and ready to show.",
    items: [
      img(CLIENT_IMAGES.engineBefore, "Engine bay before detail", "process"),
      img(CLIENT_IMAGES.engineShowcase, "Engine bay detail in progress", "process"),
      img(CLIENT_IMAGES.engineAfter, "Engine bay after detail", "result"),
      img(CLIENT_IMAGES.engineShowcase, "Finished engine bay", "result"),
    ],
  },
};

export function getServiceProcessStory(
  slug: string
): ServiceProcessStory | null {
  const base = STORIES[slug];
  if (!base) return null;
  const featuredVideo = SERVICE_PROCESS_FEATURED_VIDEO[slug];
  return featuredVideo ? { ...base, featuredVideo } : base;
}
