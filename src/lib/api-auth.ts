import { getSession } from "@/lib/auth";
import { apiUnauthorized } from "@/lib/utils";

export async function withAdminAuth<T>(
  handler: (session: { sub: string; email: string }) => Promise<T>
) {
  const session = await getSession();
  if (!session) {
    return apiUnauthorized();
  }
  return handler(session);
}
