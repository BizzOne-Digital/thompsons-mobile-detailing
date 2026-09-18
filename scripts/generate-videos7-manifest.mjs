/**
 * Reads public/videos7/*.mp4 and writes src/lib/client-videos7.generated.ts
 * Run: node scripts/generate-videos7-manifest.mjs
 */
import fs from "fs";
import path from "path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const videosDir = path.join(repoRoot, "public", "videos7");
const outFile = path.join(repoRoot, "src", "lib", "client-videos7.generated.ts");

const base = "/videos7";

const files = fs
  .readdirSync(videosDir)
  .filter((f) => f.toLowerCase().endsWith(".mp4"))
  .map((name) => {
    const full = path.join(videosDir, name);
    const stat = fs.statSync(full);
    return { name, size: stat.size };
  })
  .sort((a, b) => b.size - a.size);

if (files.length === 0) {
  console.error("No .mp4 files in public/videos7");
  process.exit(1);
}

const src = (name) => `${base}/${name}`;

const labels = [
  "Thompson's mobile detailing — showcase",
  "On-site professional detailing",
  "Exterior gloss and finish",
  "Interior and cabin care",
  "Engine bay and under-hood detail",
  "Foam wash and hand finish",
  "Ceramic protection results",
  "Paint refinement in progress",
  "Luxury SUV mobile detail",
  "Truck and fleet exterior care",
  "Signature hand wash",
  "Factory-fresh mobile results",
];

const clips = files.map((f, i) => ({
  src: src(f.name),
  label: labels[i % labels.length],
}));

const pick = (i) => clips[Math.min(i, clips.length - 1)].src;

const body = `/** Auto-generated — run: node scripts/generate-videos7-manifest.mjs */
export const VIDEOS7_BASE = "${base}";

export type Videos7Clip = { src: string; label: string };

export const VIDEOS7_ALL: Videos7Clip[] = ${JSON.stringify(clips, null, 2)};

/** Largest client clip — home hero when admin hero is not set */
export const VIDEOS7_HERO = ${JSON.stringify(pick(0))};

export const VIDEOS7_ABOUT: Videos7Clip[] = ${JSON.stringify(clips.slice(0, 3))};

export const VIDEOS7_HOME_LIVE = ${JSON.stringify(pick(3))};
export const VIDEOS7_INTERIOR = ${JSON.stringify(pick(4))};
export const VIDEOS7_ENGINE = ${JSON.stringify(pick(5))};
export const VIDEOS7_CERAMIC = ${JSON.stringify(pick(6))};
export const VIDEOS7_SIGNATURE_FOAM = ${JSON.stringify(pick(7))};
export const VIDEOS7_EXTERIOR_A = ${JSON.stringify(pick(8))};
export const VIDEOS7_EXTERIOR_B = ${JSON.stringify(pick(9))};
export const VIDEOS7_CLIP_C = ${JSON.stringify(pick(10))};
export const VIDEOS7_CLIP_D = ${JSON.stringify(pick(11))};
`;

fs.writeFileSync(outFile, body, "utf8");
console.log(`Wrote ${clips.length} videos to ${path.relative(repoRoot, outFile)}`);
