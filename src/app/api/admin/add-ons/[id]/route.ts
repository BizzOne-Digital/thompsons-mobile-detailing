import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { apiError } from "@/lib/utils";
import { AddOn } from "@/models/AddOn";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return withAdminAuth(async () => {
    const body = await request.json();
    await connectDB();
    const item = await AddOn.findByIdAndUpdate(id, body, { new: true });
    if (!item) return apiError("Not found", 404);
    return Response.json(item);
  });
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return withAdminAuth(async () => {
    await connectDB();
    await AddOn.findByIdAndDelete(id);
    return Response.json({ ok: true });
  });
}
