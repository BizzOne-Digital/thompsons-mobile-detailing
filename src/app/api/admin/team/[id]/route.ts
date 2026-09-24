import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { apiError } from "@/lib/utils";
import { TeamMember } from "@/models/TeamMember";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return withAdminAuth(async () => {
    await connectDB();
    const item = await TeamMember.findByIdAndUpdate(
      id,
      await request.json(),
      { new: true }
    );
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
    await TeamMember.findByIdAndDelete(id);
    return Response.json({ ok: true });
  });
}
