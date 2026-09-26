/** Canonical site origin for SEO, sitemap, robots, and emails. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (
    fromEnv &&
    !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(fromEnv)
  ) {
    return fromEnv;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "https://www.tmdaz.com";
}
