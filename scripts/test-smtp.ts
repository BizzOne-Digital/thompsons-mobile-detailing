/**
 * Verify SMTP and send a test message.
 * Run: npm run test-smtp
 */
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

import nodemailer from "nodemailer";
import { BRAND } from "../src/lib/constants";

async function main() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to =
    process.env.BOOKING_NOTIFICATION_EMAIL?.trim() ||
    process.env.SMTP_USER ||
    BRAND.email;
  const from =
    process.env.SMTP_FROM ||
    `Thompson's Mobile Detailing <${user ?? BRAND.email}>`;

  if (!host || !user || !pass) {
    console.error(
      "Missing SMTP_HOST, SMTP_USER, or SMTP_PASS in .env.local"
    );
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
  });

  console.log("Verifying SMTP connection…");
  await transporter.verify();
  console.log("SMTP verify OK.");

  const info = await transporter.sendMail({
    from,
    to,
    subject: "TMD Website — SMTP test",
    text: `This is a test email from ${BRAND.name}. Booking and contact notifications are configured.`,
    html: `<p>This is a <strong>test email</strong> from <em>${BRAND.name}</em>.</p><p>Booking and contact notifications are configured.</p>`,
  });

  console.log("Test message sent:", info.messageId);
  console.log("Delivered to:", to);
}

main().catch((err) => {
  console.error("SMTP test failed:", err);
  process.exit(1);
});
