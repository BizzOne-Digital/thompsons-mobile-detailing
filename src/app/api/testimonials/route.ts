import { connectDB } from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");

  await connectDB();
  const filter: Record<string, unknown> = { approved: true };
  if (featured === "true") filter.featured = true;

  const testimonials = await Testimonial.find(filter)
    .sort({ displayOrder: 1 })
    .lean();
  return Response.json(testimonials);
}
