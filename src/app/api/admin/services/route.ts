import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { slugify, apiError } from "@/lib/utils";
import { Service } from "@/models/Service";

export async function GET() {
  return withAdminAuth(async () => {
    await connectDB();
    const services = await Service.find().sort({ displayOrder: 1 }).lean();
    return Response.json(services);
  });
}

export async function POST(request: Request) {
  return withAdminAuth(async () => {
    const body = await request.json();
    if (!body.name) return apiError("name is required");
    await connectDB();
    const slug = body.slug || slugify(body.name);
    const service = await Service.create({ ...body, slug });
    return Response.json(service);
  });
}
