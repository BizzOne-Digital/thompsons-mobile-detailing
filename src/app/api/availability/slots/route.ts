import { getAvailableSlots } from "@/lib/availability";
import { apiError } from "@/lib/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  if (!date) return apiError("date is required");

  try {
    const slots = await getAvailableSlots(date);
    return Response.json({ slots });
  } catch {
    return Response.json({ slots: [] });
  }
}
