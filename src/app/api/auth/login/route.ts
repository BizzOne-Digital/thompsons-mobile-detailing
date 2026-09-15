import { connectDB } from "@/lib/mongodb";
import { createSession, verifyPassword } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";
import { apiError } from "@/lib/utils";
import { AdminUser } from "@/models/AdminUser";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const limited = rateLimit(`login:${ip}`, 10, 15 * 60 * 1000);
  if (!limited.allowed) {
    return apiError("Too many attempts. Try again later.", 429);
  }

  const body = await request.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("Invalid credentials", 400);
  }

  await connectDB();
  const admin = await AdminUser.findOne({ email: parsed.data.email });
  if (!admin) {
    return apiError("Invalid email or password", 401);
  }

  const valid = await verifyPassword(parsed.data.password, admin.passwordHash);
  if (!valid) {
    return apiError("Invalid email or password", 401);
  }

  await createSession(admin._id.toString(), admin.email);
  return Response.json({ ok: true, email: admin.email });
}
