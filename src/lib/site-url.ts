/** Primary production origin — used when env is unset (never use VERCEL_URL for SEO). */
export const DEFAULT_SITE_URL = "https://www.tmdaz.com";

/** Canonical site origin for SEO, sitemap, robots, schema, and emails. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (
    fromEnv &&
    !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(fromEnv)
  ) {
    return fromEnv;
  }
  return DEFAULT_SITE_URL;
}

/** Hostname for redirects (e.g. www.tmdaz.com). */
export function getCanonicalHost(): string {
  try {
    return new URL(getSiteUrl()).host.toLowerCase();
  } catch {
    return "www.tmdaz.com";
  }
}
