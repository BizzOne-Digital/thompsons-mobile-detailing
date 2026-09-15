import { connectDB } from "@/lib/mongodb";
import { GalleryItem } from "@/models/GalleryItem";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  await connectDB();
  const filter: Record<string, unknown> = { published: true };
  if (category) filter.category = category;

  const items = await GalleryItem.find(filter).sort({ displayOrder: 1 }).lean();
  return Response.json(items);
}
