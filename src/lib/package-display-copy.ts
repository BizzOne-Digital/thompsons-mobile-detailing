/** Client-approved package marketing copy (overrides DB short text on key surfaces). */

export const PACKAGE_SECTION_SUBTITLE =
  "From routine care to complete restoration—give your vehicle the attention it deserves.";

const PACKAGE_SHORT: Record<string, string> = {
  "refresh-detail":
    "For well-maintained vehicles showing light signs of daily use—dust, fingerprints, smudges, and minor dirt. For interiors without stains, pet hair, or heavy buildup—bringing back a factory-fresh appearance and a fresh, inviting scent.",
  "restore-detail":
    "For surface stains and spills on seats and carpets, accumulated grime, dull or worn-looking hard plastics, and thick dust and lint around buttons, crevices, and the steering wheel—bringing back a factory-fresh appearance and a fresh, inviting scent.",
  "reset-detail":
    "Our most intensive restoration for severely neglected interiors—deeply embedded stains, excessive pet hair, overpowering odors, and heavy layers of stubborn dirt and grime. Intensive cleaning, deep extraction, odor treatment, and hard plastic restoration remove severe buildup and revive faded, dull, and worn-looking surfaces, bringing back a factory-fresh appearance and a fresh, inviting scent.",
};

export function getPackageShortDescription(
  slug: string,
  fallback: string
): string {
  return PACKAGE_SHORT[slug] ?? fallback;
}

export type PackageBadge = {
  label: string;
  variant: "routine" | "popular" | "maximum";
};

export const PACKAGE_BADGES: Record<string, PackageBadge> = {
  "refresh-detail": { label: "Routine Care", variant: "routine" },
  "restore-detail": { label: "Most Popular", variant: "popular" },
  "reset-detail": { label: "Maximum Restoration", variant: "maximum" },
};
