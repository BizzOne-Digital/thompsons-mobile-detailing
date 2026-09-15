import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { slugify, apiError } from "@/lib/utils";
import { AddOn } from "@/models/AddOn";

export async function GET() {
  return withAdminAuth(async () => {
    await connectDB();
    return Response.json(await AddOn.find().sort({ displayOrder: 1 }).lean());
  });
}

export async function POST(request: Request) {
  return withAdminAuth(async () => {
    const body = await request.json();
    if (!body.name) return apiError("name is required");
    await connectDB();
    const item = await AddOn.create({
      ...body,
      slug: body.slug || slugify(body.name),
    });
    return Response.json(item);
  });
}
