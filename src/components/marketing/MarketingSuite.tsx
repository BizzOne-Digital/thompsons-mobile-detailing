"use client";

import { useState } from "react";
import { FirstTimePromoOffer } from "@/components/marketing/FirstTimePromoOffer";
import {
  CookieConsentBanner,
  MarketingTracking,
} from "@/components/marketing/MarketingTracking";
import { getPromoConfig } from "@/lib/marketing-config";

export function MarketingSuite() {
  const [consentTick, setConsentTick] = useState(0);
  const promoOn = getPromoConfig().enabled;

  return (
    <>
      {promoOn ? <FirstTimePromoOffer key={`promo-${consentTick}`} /> : null}
      <CookieConsentBanner
        onConsentChange={() => setConsentTick((n) => n + 1)}
      />
      <MarketingTracking key={`track-${consentTick}`} />
    </>
  );
}
