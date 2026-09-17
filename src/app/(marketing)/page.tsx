import { HomeView } from "@/components/home/HomeView";
import {
  getPublicFaqs,
  getPublicServices,
  getPublicTestimonials,
  getSettings,
} from "@/lib/data";
import { toPublicSiteSettings } from "@/lib/public-settings";
import { CLIENT_IMAGES } from "@/lib/client-images";
import { resolvePublicImageUrl } from "@/lib/media-url";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [services, faqs, testimonials, settingsRaw] = await Promise.all([
    getPublicServices(),
    getPublicFaqs(8),
    getPublicTestimonials(true),
    getSettings(),
  ]);
  const site = toPublicSiteSettings(settingsRaw);
  const ownerPhotoUrl = resolvePublicImageUrl(
    site.ownerPhotoUrl,
    CLIENT_IMAGES.ownerPortrait
  );
  const teamGroupPhotoUrl = resolvePublicImageUrl(
    site.teamGroupPhotoUrl,
    CLIENT_IMAGES.teamGroup
  );

  return (
    <HomeView
      siteSettings={site}
      ownerPhotoUrl={ownerPhotoUrl}
      teamGroupPhotoUrl={teamGroupPhotoUrl}
      services={services.map((s) => ({
        _id: String(s._id),
        name: s.name,
        slug: s.slug,
        shortDescription: s.shortDescription,
        startingPrice: s.startingPrice,
        vehiclePrices: s.vehiclePrices,
        features: s.features,
      }))}
      faqs={faqs.map((f) => ({
        _id: String(f._id),
        question: f.question,
        answer: f.answer,
      }))}
      testimonials={testimonials.map((t) => ({
        _id: String(t._id),
        customerName: t.customerName,
        rating: t.rating,
        review: t.review,
        vehicle: t.vehicle,
      }))}
    />
  );
}
