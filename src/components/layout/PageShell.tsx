import { MarketingPageHero } from "@/components/layout/MarketingPageHero";

export function PageShell({
  title,
  subtitle,
  heroImage,
  heroVideo,
  eyebrow,
  children,
}: {
  title: string;
  subtitle?: string;
  heroImage?: string;
  heroVideo?: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-w-0 overflow-x-clip">
      <MarketingPageHero
        title={title}
        subtitle={subtitle}
        heroImage={heroImage}
        heroVideo={heroVideo}
        eyebrow={eyebrow}
      />
      <div className="relative z-10 mx-auto w-full min-w-0 max-w-7xl bg-midnight px-4 pb-20 pt-12 sm:px-5 lg:px-8">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(100%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/35 to-transparent"
          aria-hidden
        />
        {children}
      </div>
    </div>
  );
}
