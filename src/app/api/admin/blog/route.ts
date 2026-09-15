import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { slugify, apiError, readingTimeMinutes } from "@/lib/utils";
import { BlogPost } from "@/models/BlogPost";

export async function GET() {
  return withAdminAuth(async () => {
    await connectDB();
    return Response.json(await BlogPost.find().sort({ createdAt: -1 }).lean());
  });
}

export async function POST(request: Request) {
  return withAdminAuth(async () => {
    const body = await request.json();
    if (!body.title) return apiError("title is required");
    await connectDB();
    const post = await BlogPost.create({
      ...body,
      slug: body.slug || slugify(body.title),
      readingTime: readingTimeMinutes(body.content || ""),
    });
    return Response.json(post);
  });
}
