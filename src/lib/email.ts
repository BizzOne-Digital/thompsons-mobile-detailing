import nodemailer from "nodemailer";
import { BRAND } from "@/lib/constants";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

const from = () => process.env.SMTP_FROM || BRAND.email;

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("SMTP not configured; email not sent:", options.subject);
    return { ok: false as const, skipped: true };
  }

  await transporter.sendMail({
    from: from(),
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });

  return { ok: true as const };
}

export function bookingCustomerEmailHtml(data: {
  customerName: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  estimatedPrice: number;
}) {
  return `
    <h2>Booking Request Received</h2>
    <p>Hi ${data.customerName},</p>
    <p>Thank you for choosing ${BRAND.name}. We received your booking request and it is <strong>pending review</strong>. We will contact you to confirm your appointment.</p>
    <ul>
      <li>Service: ${data.serviceName}</li>
      <li>Preferred date: ${data.preferredDate}</li>
      <li>Preferred time: ${data.preferredTime}</li>
      <li>Estimated total: $${data.estimatedPrice.toFixed(2)}</li>
    </ul>
    <p>${BRAND.tagline}</p>
    <p>Questions? Call ${BRAND.phone} or email ${BRAND.email}</p>
  `;
}

export function bookingAdminEmailHtml(data: Record<string, string | number>) {
  const rows = Object.entries(data)
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${v}</td></tr>`)
    .join("");
  return `<h2>New Booking Request</h2><table>${rows}</table>`;
}
