"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Tag, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { getPromoConfig } from "@/lib/marketing-config";
import {
  markPromoDismissed,
  readClaimedPromoCode,
  readPromoDismissedRecently,
  storeClaimedPromoCode,
} from "@/lib/marketing-storage";
import { cn } from "@/lib/utils";

export function FirstTimePromoOffer() {
  const promo = getPromoConfig();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [chipOpen, setChipOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [claimedCode, setClaimedCode] = useState<string | null>(null);

  const isAdmin = pathname.startsWith("/admin");
  const isBookingSuccess = pathname.startsWith("/booking");

  useEffect(() => {
    if (!promo.enabled || isAdmin) return;
    setClaimedCode(readClaimedPromoCode());
    if (readClaimedPromoCode()) {
      setChipOpen(true);
      return;
    }
    if (readPromoDismissedRecently()) {
      setChipOpen(true);
      return;
    }
    const timer = window.setTimeout(() => setOpen(true), promo.delayMs);
    return () => window.clearTimeout(timer);
  }, [promo.enabled, promo.delayMs, isAdmin]);

  const claimCode = useCallback(() => {
    storeClaimedPromoCode(promo.code);
    setClaimedCode(promo.code);
    setOpen(false);
    setChipOpen(true);
    toast.success(`Code ${promo.code} saved — use it when you book`);
  }, [promo.code]);

  const dismiss = () => {
    markPromoDismissed();
    setOpen(false);
    setChipOpen(true);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(promo.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy code");
    }
  };

  const sendEmail = async () => {
    if (!email.trim()) {
      toast.error("Enter your email");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/marketing/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: "popup_email",
          pagePath: pathname,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      storeClaimedPromoCode(promo.code);
      setClaimedCode(promo.code);
      setOpen(false);
      setChipOpen(true);
      toast.success(
        data.followUpSent
          ? "Check your inbox for your promo code"
          : "Offer saved — book with your code anytime"
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not send offer");
    } finally {
      setSending(false);
    }
  };

  if (!promo.enabled || isAdmin) return null;

  const bookingHref = `/booking?promo=${encodeURIComponent(promo.code)}`;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-offer-title"
        >
          <div className="relative w-full max-w-md rounded-3xl border border-gold/35 bg-midnight p-6 shadow-2xl">
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-4 top-4 rounded-full p-1 text-off-white/60 hover:text-white"
              aria-label="Close offer"
            >
              <X className="h-5 w-5" />
            </button>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-bright-gold">
              First-time customers
            </p>
            <h2
              id="promo-offer-title"
              className="mt-2 font-display text-2xl text-white"
            >
              {promo.headline}
            </h2>
            <p className="mt-3 text-sm text-off-white/75">
              Use code{" "}
              <span className="font-semibold text-bright-gold">{promo.code}</span>{" "}
              when you book your first mobile detail with us.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-off-white/50">
              {promo.terms}
            </p>

            <div className="mt-5 flex items-center gap-2 rounded-xl border border-gold/30 bg-black/30 px-4 py-3">
              <Tag className="h-4 w-4 shrink-0 text-bright-gold" />
              <span className="font-mono text-lg tracking-wider text-bright-gold">
                {promo.code}
              </span>
              <button
                type="button"
                onClick={() => void copyCode()}
                className="ml-auto text-off-white/70 hover:text-white"
                aria-label="Copy promo code"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email me this offer (optional)"
                className="w-full rounded-xl border border-gold/25 bg-midnight px-4 py-3 text-sm text-off-white placeholder:text-off-white/40"
              />
              <button
                type="button"
                disabled={sending}
                onClick={() => void sendEmail()}
                className="w-full rounded-full border border-gold/40 py-2.5 text-sm font-semibold text-bright-gold hover:bg-gold/10 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Email my code"}
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link
                href={bookingHref}
                onClick={claimCode}
                className="flex-1 rounded-full bg-gradient-to-r from-gold via-bright-gold to-soft-gold py-3 text-center text-sm font-semibold text-midnight"
              >
                Book with {promo.percent}% off
              </Link>
              <button
                type="button"
                onClick={claimCode}
                className="flex-1 rounded-full border border-white/15 py-3 text-sm font-semibold text-off-white/85"
              >
                Save code
              </button>
            </div>
          </div>
        </div>
      )}

      {chipOpen && !open && !isBookingSuccess && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "fixed bottom-24 right-4 z-[65] flex max-w-[min(100vw-2rem,280px)] items-center gap-2 rounded-full border border-gold/40 bg-midnight/95 px-4 py-3 text-left text-xs font-semibold text-bright-gold shadow-lg backdrop-blur-md lg:bottom-6",
            claimedCode && "ring-1 ring-bright-gold/30"
          )}
        >
          <Tag className="h-4 w-4 shrink-0" />
          <span>
            {claimedCode
              ? `${promo.percent}% off · ${promo.code}`
              : `${promo.percent}% off first detail`}
          </span>
        </button>
      )}
    </>
  );
}
