import { connectDB } from "@/lib/mongodb";
import { apiError } from "@/lib/utils";
import { BlogPost } from "@/models/BlogPost";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  await connectDB();
  const post = await BlogPost.findOne({
    slug,
    status: "published",
    publishedAt: { $lte: new Date() },
  }).lean();
  if (!post) return apiError("Post not found", 404);
  return Response.json(post);
}
