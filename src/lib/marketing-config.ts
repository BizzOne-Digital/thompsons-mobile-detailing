/** Public marketing / promo settings (NEXT_PUBLIC_*). */

function envFlag(name: string, defaultOn = true) {
  const raw = process.env[name]?.trim().toLowerCase();
  if (raw === "false" || raw === "0" || raw === "off") return false;
  if (raw === "true" || raw === "1" || raw === "on") return true;
  return defaultOn;
}

export function getPromoConfig() {
  const enabled = envFlag("NEXT_PUBLIC_PROMO_ENABLED", true);
  const percent = Number(process.env.NEXT_PUBLIC_PROMO_PERCENT || 10);
  const code = (
    process.env.NEXT_PUBLIC_PROMO_CODE?.trim() || "WELCOME10"
  ).toUpperCase();
  const headline =
    process.env.NEXT_PUBLIC_PROMO_HEADLINE?.trim() ||
    `${percent}% off your first detail`;
  const terms =
    process.env.NEXT_PUBLIC_PROMO_TERMS?.trim() ||
    "New customers only. One use per household. Mention code at booking or in notes. Not valid with other offers.";

  return {
    enabled,
    percent: Number.isFinite(percent) ? percent : 10,
    code,
    headline,
    terms,
    delayMs: Number(process.env.NEXT_PUBLIC_PROMO_DELAY_MS || 8000),
  };
}

export function getMarketingTrackingConfig() {
  return {
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "",
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "",
  };
}

export function marketingFeaturesActive() {
  const promo = getPromoConfig();
  const tracking = getMarketingTrackingConfig();
  return promo.enabled || Boolean(tracking.metaPixelId || tracking.gaMeasurementId);
}
