import { connectDB } from "@/lib/mongodb";
import { createSession, hashPassword } from "@/lib/auth";
import { setupAdminSchema } from "@/lib/validations";
import { apiError } from "@/lib/utils";
import { AdminUser } from "@/models/AdminUser";

export async function POST(request: Request) {
  const setupToken = process.env.ADMIN_SETUP_TOKEN;
  if (!setupToken) {
    return apiError("Admin setup is not enabled", 403);
  }

  const body = await request.json();
  const parsed = setupAdminSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid input");
  }

  if (parsed.data.token !== setupToken) {
    return apiError("Invalid setup token", 403);
  }

  await connectDB();
  const existing = await AdminUser.countDocuments();
  if (existing > 0) {
    return apiError("Admin already exists", 409);
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const admin = await AdminUser.create({
    email: parsed.data.email,
    name: parsed.data.name,
    passwordHash,
  });

  await createSession(admin._id.toString(), admin.email);
  return Response.json({ ok: true });
}
