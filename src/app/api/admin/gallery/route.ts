import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import { GalleryItem } from "@/models/GalleryItem";

export async function GET() {
  return withAdminAuth(async () => {
    await connectDB();
    return Response.json(
      await GalleryItem.find().sort({ displayOrder: 1 }).lean()
    );
  });
}

export async function POST(request: Request) {
  return withAdminAuth(async () => {
    const body = await request.json();
    await connectDB();
    const item = await GalleryItem.create(body);
    return Response.json(item);
  });
}
