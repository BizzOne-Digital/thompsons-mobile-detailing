/** Browser-only keys for promo + consent (marketing UI). */

export const MARKETING_STORAGE = {
  consent: "tmd_marketing_consent",
  promoDismissedAt: "tmd_promo_dismissed_at",
  promoClaimedCode: "tmd_promo_claimed_code",
  abandonSentForEmail: "tmd_booking_abandon_sent",
} as const;

const DISMISS_DAYS = 7;

export function readPromoDismissedRecently(): boolean {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(MARKETING_STORAGE.promoDismissedAt);
  if (!raw) return false;
  const ts = Number(raw);
  if (!Number.isFinite(ts)) return false;
  return Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000;
}

export function markPromoDismissed() {
  localStorage.setItem(
    MARKETING_STORAGE.promoDismissedAt,
    String(Date.now())
  );
}

export function readClaimedPromoCode(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(MARKETING_STORAGE.promoClaimedCode);
}

export function storeClaimedPromoCode(code: string) {
  localStorage.setItem(MARKETING_STORAGE.promoClaimedCode, code.toUpperCase());
}

export type MarketingConsent = "granted" | "denied" | null;

export function readMarketingConsent(): MarketingConsent {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(MARKETING_STORAGE.consent);
  if (v === "granted" || v === "denied") return v;
  return null;
}

export function storeMarketingConsent(value: "granted" | "denied") {
  localStorage.setItem(MARKETING_STORAGE.consent, value);
}

export function abandonAlreadySent(email: string): boolean {
  const key = `${MARKETING_STORAGE.abandonSentForEmail}:${email.toLowerCase()}`;
  return sessionStorage.getItem(key) === "1";
}

export function markAbandonSent(email: string) {
  const key = `${MARKETING_STORAGE.abandonSentForEmail}:${email.toLowerCase()}`;
  sessionStorage.setItem(key, "1");
}
