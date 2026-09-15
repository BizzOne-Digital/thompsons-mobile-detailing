import { connectDB } from "@/lib/mongodb";
import { FAQ } from "@/models/FAQ";

export async function GET() {
  await connectDB();
  const faqs = await FAQ.find({ active: true }).sort({ displayOrder: 1 }).lean();
  return Response.json(faqs);
}
