import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { apiError } from "@/lib/utils";
import { Service } from "@/models/Service";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return withAdminAuth(async () => {
    const body = await request.json();
    await connectDB();
    const service = await Service.findByIdAndUpdate(id, body, { new: true });
    if (!service) return apiError("Not found", 404);
    return Response.json(service);
  });
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return withAdminAuth(async () => {
    await connectDB();
    await Service.findByIdAndDelete(id);
    return Response.json({ ok: true });
  });
}
