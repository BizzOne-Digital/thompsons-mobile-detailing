import { HomeView } from "@/components/home/HomeView";
import {
  getPublicFaqs,
  getPublicServices,
  getPublicTestimonials,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [services, faqs, testimonials] = await Promise.all([
    getPublicServices(),
    getPublicFaqs(8),
    getPublicTestimonials(true),
  ]);

  return (
    <HomeView
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
