import { connectDB } from "@/lib/mongodb";
import { AddOn } from "@/models/AddOn";

export async function GET() {
  await connectDB();
  const addOns = await AddOn.find({ active: true }).sort({ displayOrder: 1 }).lean();
  return Response.json(addOns);
}
