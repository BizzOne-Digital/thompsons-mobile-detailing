import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";

export async function GET() {
  return withAdminAuth(async () => {
    await connectDB();
    return Response.json(
      await Testimonial.find().sort({ displayOrder: 1 }).lean()
    );
  });
}

export async function POST(request: Request) {
  return withAdminAuth(async () => {
    await connectDB();
    const item = await Testimonial.create(await request.json());
    return Response.json(item);
  });
}
