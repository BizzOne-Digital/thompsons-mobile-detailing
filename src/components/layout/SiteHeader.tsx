"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HEADER_NAV_LINKS, NAV_LINKS } from "@/lib/constants";
import { useSiteSettings } from "@/components/layout/SiteSettingsProvider";
import { phoneHref } from "@/lib/public-settings";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const site = useSiteSettings();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onHeroOverlay = !scrolled && !pathname.startsWith("/admin");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "glass-panel border-b border-gold/15 py-2 shadow-lg"
          : "bg-gradient-to-b from-black/70 to-transparent py-4 md:py-5"
      )}
    >
      <div className="mx-auto grid w-full min-w-0 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-2 px-3 sm:gap-3 sm:px-4 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={site.logoUrl || "/logo.jpg"}
            alt={site.businessName}
            width={64}
            height={64}
            className="h-11 w-11 rounded-full ring-2 ring-gold/60 shadow-[0_0_24px_rgba(217,165,20,0.35)] sm:h-14 sm:w-14 md:h-16 md:w-16"
            priority
          />
        </Link>

        <nav
          className="hidden items-center justify-center gap-6 text-[13px] font-medium tracking-wide text-white/90 xl:flex"
          aria-label="Main"
        >
          {HEADER_NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-2 transition-colors hover:text-bright-gold",
                  active && "text-bright-gold"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-bright-gold"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-2 md:gap-3">
          <a
            href={phoneHref(site.phone)}
            className={cn(
              "hidden items-center gap-2 rounded-full border border-gold/55 bg-black/25 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:border-bright-gold hover:bg-black/40 lg:inline-flex"
            )}
          >
            <Phone className="h-4 w-4 text-bright-gold" />
            {site.phone}
          </a>
          <Link
            href="/booking"
            className={cn(
              "hidden items-center gap-1 rounded-full bg-gradient-to-r from-soft-gold via-bright-gold to-gold px-5 py-2.5 text-sm font-bold text-midnight shadow-[0_0_28px_rgba(255,201,40,0.45)] transition hover:scale-[1.03] sm:inline-flex",
              onHeroOverlay && "shadow-[0_0_36px_rgba(255,201,40,0.55)]"
            )}
          >
            Book Now
            <ChevronRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            className="rounded-full border border-gold/40 p-2.5 xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden glass-panel border-t border-gold/20"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a href={phoneHref(site.phone)} className="rounded-lg px-3 py-3">
                Call {site.phone}
              </a>
              <Button href="/booking" className="mt-2 w-full">
                Book Now
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
