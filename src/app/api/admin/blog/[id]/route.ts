import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { apiError, readingTimeMinutes } from "@/lib/utils";
import { BlogPost } from "@/models/BlogPost";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return withAdminAuth(async () => {
    const body = await request.json();
    if (body.content) {
      body.readingTime = readingTimeMinutes(body.content);
    }
    await connectDB();
    const post = await BlogPost.findByIdAndUpdate(id, body, { new: true });
    if (!post) return apiError("Not found", 404);
    return Response.json(post);
  });
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return withAdminAuth(async () => {
    await connectDB();
    await BlogPost.findByIdAndDelete(id);
    return Response.json({ ok: true });
  });
}
