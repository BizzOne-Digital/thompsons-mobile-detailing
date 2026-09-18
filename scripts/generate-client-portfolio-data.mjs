/**
 * Regenerates src/lib/client-portfolio-projects.ts from public/images/portfolio/*
 * Run: node scripts/generate-client-portfolio-data.mjs
 */
import fs from "fs";
import path from "path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const portfolioRoot = path.join(repoRoot, "public", "images", "portfolio");
const outFile = path.join(repoRoot, "src", "lib", "client-portfolio-projects.ts");

const SLUG_TITLES = {
  "chevy-tahoe-setina": "Chevrolet Tahoe (SETINA)",
  "gmc-sierra-at4-white": "GMC Sierra AT4",
  "gmc-sierra-denali-gray": "GMC Sierra Denali",
  "ford-fusion-mobile-process": "Mobile setup — Ford Fusion",
  "classic-car-foam-wash": "Classic car foam wash",
  "ford-bronco-foam-wash": "Ford Bronco foam wash",
  "toyota-tundra-trd": "Toyota Tundra TRD",
  "tesla-model-y-red": "Tesla Model Y",
  "tesla-model-3-gray": "Tesla Model 3",
  "white-porsche-cayenne": "Porsche Cayenne",
  "porsche-911-cabriolet": "Porsche 911 Cabriolet",
  "silver-mercedes-e-class": "Mercedes-Benz E-Class",
  "white-ford-super-duty-lifted": "Ford Super Duty",
  "gray-ford-super-duty": "Ford Super Duty",
  "lime-green-toyota-4runner": "Toyota 4Runner TRD Pro",
  "blue-honda-civic": "Honda Civic",
  "white-mazda-cx5": "Mazda CX-5",
  "black-bmw-x5": "BMW X5",
  "gray-dodge-challenger": "Dodge Challenger",
  "ford-mustang-mach-e-gray": "Ford Mustang Mach-E",
  "white-chevrolet-camaro": "Chevrolet Camaro",
};

const FEATURED_ORDER = [
  "toyota-tundra-trd",
  "chevy-tahoe-setina",
  "gmc-sierra-at4-white",
  "ford-edge",
  "gmc-yukon",
  "white-ford-super-duty-lifted",
  "black-cadillac-escalade",
  "white-porsche-cayenne",
  "porsche-911-cabriolet",
  "tesla-model-y-red",
  "lime-green-toyota-4runner",
  "blue-honda-civic",
  "white-mazda-cx5",
  "silver-mercedes-e-class",
];

function titleFromSlug(slug) {
  if (SLUG_TITLES[slug]) return SLUG_TITLES[slug];
  return slug
    .split("-")
    .map((w) => {
      if (/^(trd|at4|gs350|mdx|tlx|cx5|suv)$/i.test(w)) return w.toUpperCase();
      if (w === "bmw") return "BMW";
      if (w === "gmc") return "GMC";
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

function captionFor(slug, title) {
  if (slug.includes("foam-wash") || slug.includes("mobile-process")) {
    return "On-site mobile detailing — professional equipment and careful technique at your location.";
  }
  return `${title} — finished exterior gloss from a recent Thompson's mobile appointment in the Valley.`;
}

const slugs = fs
  .readdirSync(portfolioRoot)
  .filter((name) => {
    const full = path.join(portfolioRoot, name);
    return fs.statSync(full).isDirectory();
  })
  .sort();

const projects = slugs.map((id) => {
  const dir = path.join(portfolioRoot, id);
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
  if (files.length === 0) return null;

  const vehicle = titleFromSlug(id);
  const cover = `/images/portfolio/${id}/${files[0]}`;
  const media = files.map((file) => ({
    type: "image",
    src: `/images/portfolio/${id}/${file}`,
    alt: `${vehicle} after mobile exterior detailing`,
  }));

  return {
    id,
    vehicle,
    serviceLabel: id.includes("foam-wash") ? "Signature wash" : "Exterior detail",
    caption: captionFor(id, vehicle),
    coverSrc: cover,
    media,
  };
}).filter(Boolean);

projects.sort((a, b) => {
  const ai = FEATURED_ORDER.indexOf(a.id);
  const bi = FEATURED_ORDER.indexOf(b.id);
  const aRank = ai === -1 ? 999 : ai;
  const bRank = bi === -1 ? 999 : bi;
  if (aRank !== bRank) return aRank - bRank;
  return a.vehicle.localeCompare(b.vehicle);
});

const body = `/** Auto-generated — run: node scripts/generate-client-portfolio-data.mjs */
import type { ExteriorPortfolioProject } from "@/lib/client-portfolio-types";

export const GENERATED_EXTERIOR_PORTFOLIO: ExteriorPortfolioProject[] = ${JSON.stringify(
  projects,
  null,
  2,
)};
`;

fs.writeFileSync(outFile, body, "utf8");
console.log(`Wrote ${projects.length} projects to ${path.relative(repoRoot, outFile)}`);
