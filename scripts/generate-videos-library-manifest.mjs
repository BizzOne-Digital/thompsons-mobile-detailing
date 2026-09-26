/**
 * Reads public/videos/videos/*.mp4 (Vernon's extra folder).
 * Prefers clips not already in public/videos7/ for featured picks.
 * Run: node scripts/generate-videos-library-manifest.mjs
 */
import fs from "fs";
import path from "path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const libraryDir = path.join(repoRoot, "public", "videos", "videos");
const videos7Dir = path.join(repoRoot, "public", "videos7");
const outFile = path.join(repoRoot, "src", "lib", "client-videos-library.generated.ts");

const base = "/videos/videos";

const videos7Names = new Set(
  fs.existsSync(videos7Dir)
    ? fs.readdirSync(videos7Dir).filter((f) => f.toLowerCase().endsWith(".mp4"))
    : [],
);

const files = fs
  .readdirSync(libraryDir)
  .filter((f) => f.toLowerCase().endsWith(".mp4"))
  .map((name) => {
    const stat = fs.statSync(path.join(libraryDir, name));
    return { name, size: stat.size, onlyInLibrary: !videos7Names.has(name) };
  })
  .sort((a, b) => b.size - a.size);

if (files.length === 0) {
  console.error("No .mp4 in public/videos/videos");
  process.exit(1);
}

const src = (name) => `${base}/${encodeURI(name).replace(/#/g, "%23")}`;

const clips = files.map((f, i) => ({
  src: src(f.name),
  label: [
    "Mobile detailing — real job footage",
    "Interior and cabin transformation",
    "Exterior gloss and hand finish",
    "Engine bay and full detail",
    "Ceramic and paint protection",
    "On-site professional service",
  ][i % 6],
  onlyInLibrary: f.onlyInLibrary,
}));

const uniquePool = clips.filter((c) => c.onlyInLibrary);
const pickPool = uniquePool.length >= 3 ? uniquePool : clips;

const featuredLabels = [
  "Interior deep clean in progress",
  "Exterior mobile detailing",
  "Factory Fresh finish on site",
];

const featured = [0, 2, 5].map((i, idx) => {
  const clip = pickPool[Math.min(i, pickPool.length - 1)];
  return { src: clip.src, label: featuredLabels[idx] };
});

const interiorPick = pickPool[Math.min(1, pickPool.length - 1)];

const body = `/** Auto-generated — run: node scripts/generate-videos-library-manifest.mjs */
export const VIDEOS_LIBRARY_BASE = "${base}";

export type VideosLibraryClip = { src: string; label: string };

export const VIDEOS_LIBRARY_ALL: VideosLibraryClip[] = ${JSON.stringify(
  clips.map(({ src: s, label }) => ({ src: s, label })),
  null,
  2,
)};

/** Curated from public/videos/videos (prefer clips not duplicated in videos7) */
export const VIDEOS_LIBRARY_FEATURED: VideosLibraryClip[] = ${JSON.stringify(featured, null, 2)};

/** Alternate interior showcase — home / services */
export const VIDEOS_LIBRARY_INTERIOR_SHOWCASE = ${JSON.stringify(interiorPick.src)};
`;

fs.writeFileSync(outFile, body, "utf8");
console.log(
  `Wrote ${clips.length} library videos (${uniquePool.length} unique vs videos7), ${featured.length} featured → ${path.relative(repoRoot, outFile)}`,
);
