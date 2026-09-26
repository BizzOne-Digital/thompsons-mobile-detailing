import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  await connectDB();
  const filter: Record<string, unknown> = { active: true };
  if (category) filter.category = category;
  if (featured === "true") filter.featured = true;

  const services = await Service.find(filter).sort({ displayOrder: 1 }).lean();
  return Response.json(services);
}
