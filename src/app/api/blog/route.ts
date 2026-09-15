import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const featured = searchParams.get("featured");

  await connectDB();
  const filter: Record<string, unknown> = {
    status: "published",
    publishedAt: { $lte: new Date() },
  };
  if (featured === "true") filter.featured = true;
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { excerpt: { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } },
    ];
  }

  const posts = await BlogPost.find(filter)
    .sort({ publishedAt: -1 })
    .limit(50)
    .lean();
  return Response.json(posts);
}
