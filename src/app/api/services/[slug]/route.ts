import { connectDB } from "@/lib/mongodb";
import { apiError } from "@/lib/utils";
import { Service } from "@/models/Service";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  await connectDB();
  const service = await Service.findOne({ slug, active: true }).lean();
  if (!service) return apiError("Service not found", 404);
  return Response.json(service);
}
