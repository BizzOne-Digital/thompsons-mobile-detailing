"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  resolvePageHeroEyebrow,
  resolvePageHeroImage,
} from "@/lib/page-hero-images";
import { cn } from "@/lib/utils";

type MarketingPageHeroProps = {
  title: string;
  subtitle?: string;
  heroImage?: string;
  heroVideo?: string;
  eyebrow?: string;
};

function buildBreadcrumbs(pathname: string) {
  if (pathname === "/") return [];
  const crumbs: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
  ];
  const segments = pathname.split("/").filter(Boolean);
  let acc = "";
  for (let i = 0; i < segments.length - 1; i++) {
    acc += `/${segments[i]}`;
    const seg = segments[i];
    const label =
      seg === "services"
        ? "Services"
        : seg === "blog"
          ? "Blog"
          : seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ label, href: acc });
  }
  return crumbs;
}

export function MarketingPageHero({
  title,
  subtitle,
  heroImage,
  heroVideo,
  eyebrow,
}: MarketingPageHeroProps) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const imageSrc = resolvePageHeroImage(pathname, heroImage);
  const eyebrowText = resolvePageHeroEyebrow(pathname, eyebrow);
  const breadcrumbs = buildBreadcrumbs(pathname);

  return (
    <section className="page-hero relative isolate min-h-[48svh] w-full overflow-hidden md:min-h-[58svh]">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {heroVideo && !reduce ? (
          <video
            className="h-full w-full object-cover object-center"
            src={heroVideo}
            poster={imageSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
        ) : (
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        )}
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/35"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-midnight via-black/25 to-black/50"
        aria-hidden
      />
      <div className="page-hero-mesh absolute inset-0 opacity-60" aria-hidden />
      <div
        className="absolute inset-0 carbon-bg opacity-[0.12]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-0 top-1/4 h-48 w-48 rounded-full bg-bright-gold/20 blur-[80px] md:-left-32 md:h-64 md:w-64 md:blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-56 w-56 rounded-full bg-royal/40 blur-[90px] md:-right-24 md:h-72 md:w-72 md:blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[48svh] w-full min-w-0 max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-5 md:min-h-[58svh] md:pb-16 md:pt-32 lg:px-8">
        {breadcrumbs.length > 0 && (
          <motion.nav
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            aria-label="Breadcrumb"
            className="mb-4 max-w-full flex flex-wrap items-center gap-1 text-[11px] font-medium text-white/55 sm:text-xs md:mb-6 md:text-sm"
          >
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
                )}
                <Link
                  href={crumb.href}
                  className="transition hover:text-bright-gold"
                >
                  {crumb.label}
                </Link>
              </span>
            ))}
            <ChevronRight className="mx-0.5 h-3.5 w-3.5 shrink-0 opacity-50" />
            <span className="text-bright-gold/90 line-clamp-1">{title}</span>
          </motion.nav>
        )}

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-[10px] font-bold uppercase tracking-[0.22em] text-bright-gold sm:text-[11px] sm:tracking-[0.3em] md:text-xs md:tracking-[0.35em]"
        >
          {eyebrowText}
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className={cn(
            "page-hero-title mt-3 max-w-full break-words font-display text-[1.75rem] font-bold leading-[1.1] tracking-tight text-white sm:mt-4 sm:text-4xl md:max-w-4xl md:text-5xl lg:text-6xl xl:text-7xl",
            title.length > 48 && "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          )}
        >
          <span className="gold-gradient-text light-sweep max-w-full break-words">
            {title}
          </span>
        </motion.h1>

        <motion.div
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 h-[3px] w-32 origin-left rounded-full bg-gradient-to-r from-bright-gold via-soft-gold to-transparent shadow-[0_0_20px_rgba(255,201,40,0.6)]"
          aria-hidden
        />

        {subtitle && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/82 md:text-lg md:leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-midnight"
        aria-hidden
      />
    </section>
  );
}
