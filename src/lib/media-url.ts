/** Use admin/upload URL when valid; otherwise static fallback (avoids broken layout). */
export function resolvePublicImageUrl(
  primary: string | undefined | null,
  fallback: string
): string {
  const trimmed = primary?.trim();
  if (!trimmed || trimmed === "undefined" || trimmed === "null") {
    return fallback;
  }
  return trimmed;
}
