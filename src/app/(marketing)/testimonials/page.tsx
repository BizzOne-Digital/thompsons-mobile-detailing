import { buildMetadata } from "@/lib/seo";
import { getPublicTestimonials } from "@/lib/data";
import { getGoogleReviews } from "@/lib/google-reviews";
import { PageShell } from "@/components/layout/PageShell";
import { HomeGoogleReviewsSection } from "@/components/home/HomeGoogleReviewsSection";
import { Star } from "lucide-react";

export const metadata = buildMetadata({
  title: "Testimonials",
  path: "/testimonials",
});
export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const [testimonials, googleReviews] = await Promise.all([
    getPublicTestimonials(),
    getGoogleReviews(),
  ]);

  const featuredFallbacks = testimonials
    .filter((t) => t.featured)
    .slice(0, 4)
    .map((t) => ({
      _id: String(t._id),
      customerName: t.customerName,
      rating: t.rating,
      review: t.review,
      vehicle: t.vehicle,
      serviceReceived: t.serviceReceived,
    }));

  return (
    <>
      <HomeGoogleReviewsSection
        data={googleReviews}
        featuredFallbacks={featuredFallbacks}
      />
      <PageShell
        title="More Customer Feedback"
        subtitle="Additional reviews from Valley drivers — packages, paint work, and add-ons."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <article key={String(t._id)} className="glass-panel rounded-2xl p-6">
              <div className="flex gap-1 text-bright-gold">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-off-white/85">{t.review}</p>
              <p className="mt-4 text-sm text-bright-gold">
                {t.customerName}
                {t.serviceReceived ? ` · ${t.serviceReceived}` : ""}
              </p>
              {t.vehicle && (
                <p className="mt-1 text-xs text-off-white/50">{t.vehicle}</p>
              )}
            </article>
          ))}
        </div>
      </PageShell>
    </>
  );
}
