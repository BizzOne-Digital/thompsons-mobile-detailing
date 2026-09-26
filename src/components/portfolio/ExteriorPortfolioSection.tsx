"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  CLIENT_EXTERIOR_PORTFOLIO_FEATURED,
  type ExteriorPortfolioProject,
} from "@/lib/client-portfolio";
import { AutoplayShowcaseVideo } from "@/components/media/AutoplayShowcaseVideo";
import { cn } from "@/lib/utils";

function ProjectCard({ project }: { project: ExteriorPortfolioProject }) {
  const [open, setOpen] = useState(false);
  const preview = project.media.slice(0, open ? project.media.length : 3);

  return (
    <article className="overflow-hidden rounded-2xl border border-gold/25 bg-navy/35">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
        aria-expanded={open}
      >
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-gold/20 sm:h-20 sm:w-32">
          <Image
            src={project.coverSrc}
            alt=""
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-bright-gold">
            {project.serviceLabel}
          </p>
          <h3 className="font-display text-lg text-white sm:text-xl">
            {project.vehicle}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-off-white/75">
            {project.caption}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-gold transition-transform",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      <div
        className={cn(
          "grid gap-3 border-t border-gold/15 px-4 pb-4 pt-3 sm:grid-cols-2 sm:px-5 lg:grid-cols-3",
          !open && "max-h-[520px] overflow-hidden"
        )}
      >
        {preview.map((item, i) =>
          item.type === "video" ? (
            <div
              key={`${project.id}-v-${i}`}
              className="overflow-hidden rounded-xl border border-gold/20 sm:col-span-2 lg:col-span-2"
            >
              <AutoplayShowcaseVideo
                src={item.src}
                poster={item.poster}
                aspectClassName="aspect-[16/10] min-h-[180px]"
                label={item.alt}
              />
            </div>
          ) : (
            <div
              key={`${project.id}-i-${i}`}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gold/20"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )
        )}
      </div>

      {!open && project.media.length > 3 && (
        <p className="border-t border-gold/10 px-5 py-2 text-center text-xs text-off-white/55">
          Tap to view all {project.media.length} shots
        </p>
      )}
    </article>
  );
}

export function ExteriorPortfolioSection({
  className,
  showHeading = true,
}: {
  className?: string;
  showHeading?: boolean;
}) {
  return (
    <section className={className} aria-labelledby="exterior-portfolio-heading">
      {showHeading && (
        <div className="mb-8 max-w-2xl">
          <h2
            id="exterior-portfolio-heading"
            className="font-display text-2xl text-bright-gold md:text-3xl"
          >
            Exterior portfolio
          </h2>
          <p className="mt-2 text-sm text-off-white/70">
            A curated selection of recent exteriors — more client work is added
            as new footage arrives.
          </p>
        </div>
      )}
      <div className="space-y-6">
        {CLIENT_EXTERIOR_PORTFOLIO_FEATURED.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
