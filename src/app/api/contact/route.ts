import { connectDB } from "@/lib/mongodb";
import { sendMail } from "@/lib/email";
import { contactSchema } from "@/lib/validations";
import { apiError } from "@/lib/utils";
import { ContactMessage } from "@/models/ContactMessage";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const limited = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
  if (!limited.allowed) {
    return apiError("Too many messages. Please try again later.", 429);
  }

  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid form data");
  }

  await connectDB();
  const message = await ContactMessage.create(parsed.data);

  const notifyEmail = process.env.BOOKING_NOTIFICATION_EMAIL;
  if (notifyEmail) {
    await sendMail({
      to: notifyEmail,
      subject: `Contact: ${parsed.data.subject}`,
      html: `<p><strong>${parsed.data.name}</strong> (${parsed.data.email})</p><p>${parsed.data.message}</p>`,
    });
  }

  return Response.json({ ok: true, id: message._id.toString() });
}
