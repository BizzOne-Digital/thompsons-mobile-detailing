import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { ContactMessage } from "@/models/ContactMessage";

export async function GET(request: Request) {
  return withAdminAuth(async () => {
    const { searchParams } = new URL(request.url);
    const archived = searchParams.get("archived");
    await connectDB();
    const filter: Record<string, unknown> = {};
    if (archived === "true") filter.archived = true;
    if (archived === "false") filter.archived = false;
    return Response.json(
      await ContactMessage.find(filter).sort({ createdAt: -1 }).lean()
    );
  });
}
