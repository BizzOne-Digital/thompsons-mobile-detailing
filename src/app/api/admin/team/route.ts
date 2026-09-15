import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { TeamMember } from "@/models/TeamMember";

export async function GET() {
  return withAdminAuth(async () => {
    await connectDB();
    return Response.json(
      await TeamMember.find().sort({ displayOrder: 1 }).lean()
    );
  });
}

export async function POST(request: Request) {
  return withAdminAuth(async () => {
    await connectDB();
    const item = await TeamMember.create(await request.json());
    return Response.json(item);
  });
}
