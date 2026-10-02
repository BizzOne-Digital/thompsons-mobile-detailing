"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getMarketingTrackingConfig } from "@/lib/marketing-config";
import {
  readMarketingConsent,
  storeMarketingConsent,
  type MarketingConsent,
} from "@/lib/marketing-storage";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function MarketingTracking() {
  const { metaPixelId, gaMeasurementId } = getMarketingTrackingConfig();
  const [consent, setConsent] = useState<MarketingConsent>(null);

  useEffect(() => {
    setConsent(readMarketingConsent());
  }, []);

  if (consent !== "granted") return null;

  return (
    <>
      {metaPixelId ? (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      ) : null}
      {gaMeasurementId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}');
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}

export function CookieConsentBanner({
  onConsentChange,
}: {
  onConsentChange?: (value: MarketingConsent) => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const tracking = getMarketingTrackingConfig();
    const needsBanner =
      Boolean(tracking.metaPixelId || tracking.gaMeasurementId) &&
      readMarketingConsent() === null;
    setVisible(needsBanner);
  }, []);

  if (!visible) return null;

  const choose = (value: "granted" | "denied") => {
    storeMarketingConsent(value);
    setVisible(false);
    onConsentChange?.(value);
  };

  return (
    <div className="fixed inset-x-0 bottom-20 z-[70] px-4 pb-2 lg:bottom-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-gold/30 bg-midnight/95 p-4 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-off-white/80 sm:text-sm">
          We use optional analytics and ad pixels to measure site visits and
          show offers to interested visitors. See our{" "}
          <a href="/privacy-policy" className="text-bright-gold hover:underline">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-off-white/80"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-full bg-gradient-to-r from-gold via-bright-gold to-soft-gold px-4 py-2 text-xs font-semibold text-midnight"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
