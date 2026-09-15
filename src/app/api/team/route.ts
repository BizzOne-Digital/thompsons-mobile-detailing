import { connectDB } from "@/lib/mongodb";
import { TeamMember } from "@/models/TeamMember";

export async function GET() {
  await connectDB();
  const team = await TeamMember.find({ active: true })
    .sort({ displayOrder: 1 })
    .lean();
  return Response.json(team);
}
