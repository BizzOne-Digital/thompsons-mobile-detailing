"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import type { GoogleReviewsSnapshot } from "@/lib/google-reviews";

export function HomeGoogleReviewsSection({
  data,
}: {
  data: GoogleReviewsSnapshot;
}) {
  const hasLiveData =
    data.source === "google" &&
    data.rating != null &&
    data.reviews.length > 0;

  if (!hasLiveData && data.source === "unconfigured") {
    return (
      <section className="border-b border-gold/20 bg-gradient-to-b from-navy/90 to-midnight py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="glass-panel rounded-3xl border border-gold/25 p-8 text-center md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-bright-gold">
              Google Reviews
            </p>
            <h2 className="mt-3 font-display text-2xl text-off-white md:text-3xl">
              Five-star mobile detailing
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-off-white/70">
              Connect your Google Business Profile to display live rating, review
              count, and recent reviews here automatically. Links below still work
              for customers.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={data.viewAllUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-border inline-flex rounded-full px-6 py-3 text-sm font-semibold text-off-white hover:bg-white/5"
              >
                Read reviews on Google
              </a>
              <a
                href={data.writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-gradient-to-r from-gold via-bright-gold to-soft-gold px-6 py-3 text-sm font-semibold text-midnight"
              >
                Leave a Google review
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!hasLiveData) return null;

  return (
    <section className="border-b border-gold/20 bg-gradient-to-b from-navy/90 to-midnight py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-bright-gold">
              Google Reviews
            </p>
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <span className="font-display text-5xl text-white">
                {data.rating?.toFixed(1)}
              </span>
              <div>
                <div className="flex gap-0.5 text-bright-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(data.rating ?? 0)
                          ? "fill-current"
                          : "fill-none opacity-40"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-off-white/70">
                  {data.totalReviews?.toLocaleString()} Google reviews
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-off-white/75">
              Real feedback from Valley customers — updated automatically from
              Google.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={data.viewAllUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-border inline-flex justify-center rounded-full px-6 py-3 text-sm font-semibold text-off-white hover:bg-white/5"
              >
                Read all on Google
              </a>
              <a
                href={data.writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-full bg-gradient-to-r from-gold via-bright-gold to-soft-gold px-6 py-3 text-sm font-semibold text-midnight"
              >
                Leave a review
              </a>
            </div>
          </div>

          <div className="grid flex-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.reviews.slice(0, 3).map((review) => (
              <article
                key={`${review.authorName}-${review.relativeTimeDescription}`}
                className="glass-panel rounded-2xl border border-gold/15 p-5"
              >
                <div className="flex items-center gap-3">
                  {review.profilePhotoUrl ? (
                    <Image
                      src={review.profilePhotoUrl}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-sm font-semibold text-bright-gold">
                      {review.authorName.charAt(0)}
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-off-white">
                      {review.authorName}
                    </p>
                    <p className="text-xs text-off-white/50">
                      {review.relativeTimeDescription}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex gap-0.5 text-bright-gold">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-off-white/80">
                  {review.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
