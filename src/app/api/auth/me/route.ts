import { getSession } from "@/lib/auth";
import { apiUnauthorized } from "@/lib/utils";

export async function GET() {
  const session = await getSession();
  if (!session) return apiUnauthorized();
  return Response.json({ email: session.email, id: session.sub });
}
