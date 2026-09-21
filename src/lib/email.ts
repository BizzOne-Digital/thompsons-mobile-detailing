import nodemailer from "nodemailer";
import { BRAND } from "@/lib/constants";

export function isSmtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim()
  );
}

function getTransporter() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
  });
}

/** Gmail: envelope From must match the authenticated account */
function resolveFromAddress() {
  const user = process.env.SMTP_USER?.trim() || BRAND.email;
  const configured = process.env.SMTP_FROM?.trim();
  if (configured && configured.includes(user)) {
    return configured;
  }
  return `${BRAND.name} <${user}>`;
}

function wrapEmailHtml(body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a1628;font-family:Arial,Helvetica,sans-serif;color:#e8e8e8;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a1628;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#111f38;border:1px solid #c9a22744;border-radius:12px;padding:28px 24px;">
        <tr><td style="font-size:14px;line-height:1.6;color:#e8e8e8;">${body}</td></tr>
        <tr><td style="padding-top:24px;font-size:12px;line-height:1.5;color:#a8b0c0;border-top:1px solid #ffffff18;margin-top:20px;">
          ${BRAND.name}<br/>
          ${BRAND.phone} · ${BRAND.email}<br/>
          Mobile detailing — Phoenix Metro, Arizona
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function htmlToPlain(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[email] SMTP not configured; skipped:", options.subject);
    return { ok: false as const, skipped: true as const };
  }

  const from = resolveFromAddress();
  const replyTo = options.replyTo || BRAND.email;
  const text = options.text ?? htmlToPlain(options.html);

  try {
    const info = await transporter.sendMail({
      from,
      replyTo,
      to: options.to,
      subject: options.subject,
      html: wrapEmailHtml(options.html),
      text: `${text}\n\n—\n${BRAND.name}\n${BRAND.phone}\n${BRAND.email}`,
      headers: {
        "X-Mailer": "ThompsonsMobileDetailing",
      },
    });
    return { ok: true as const, messageId: info.messageId };
  } catch (err) {
    console.error("[email] send failed:", options.subject, err);
    return { ok: false as const, skipped: false as const, error: String(err) };
  }
}

export function bookingCustomerEmailHtml(data: {
  customerName: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  estimatedPrice: number;
}) {
  return `
    <p style="margin:0 0 16px;font-size:18px;color:#f0c040;font-weight:bold;">Booking request received</p>
    <p style="margin:0 0 12px;">Hi ${escapeHtml(data.customerName)},</p>
    <p style="margin:0 0 16px;">Thank you for choosing ${escapeHtml(BRAND.name)}. We received your booking request and it is <strong>pending review</strong>. We will contact you soon to confirm your appointment.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;">
      <tr><td style="padding:6px 0;color:#a8b0c0;">Service</td><td style="padding:6px 0;">${escapeHtml(data.serviceName)}</td></tr>
      <tr><td style="padding:6px 0;color:#a8b0c0;">Preferred date</td><td style="padding:6px 0;">${escapeHtml(data.preferredDate)}</td></tr>
      <tr><td style="padding:6px 0;color:#a8b0c0;">Preferred time</td><td style="padding:6px 0;">${escapeHtml(data.preferredTime)}</td></tr>
      <tr><td style="padding:6px 0;color:#a8b0c0;">Estimated total</td><td style="padding:6px 0;">$${data.estimatedPrice.toFixed(2)}</td></tr>
    </table>
    <p style="margin:16px 0 0;">${escapeHtml(BRAND.tagline)}</p>
  `;
}

export function bookingCustomerEmailText(data: {
  customerName: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  estimatedPrice: number;
}) {
  return `Hi ${data.customerName},

Thank you for choosing ${BRAND.name}. We received your booking request (pending review).

Service: ${data.serviceName}
Preferred date: ${data.preferredDate}
Preferred time: ${data.preferredTime}
Estimated total: $${data.estimatedPrice.toFixed(2)}

We will contact you to confirm your appointment.
Questions? Call ${BRAND.phone} or email ${BRAND.email}.`;
}

export function bookingAdminEmailHtml(data: Record<string, string | number>) {
  const rows = Object.entries(data)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px 8px 0;color:#a8b0c0;vertical-align:top;">${escapeHtml(k)}</td><td style="padding:8px 0;">${escapeHtml(String(v))}</td></tr>`
    )
    .join("");
  return `
    <p style="margin:0 0 16px;font-size:18px;color:#f0c040;font-weight:bold;">New booking request</p>
    <p style="margin:0 0 16px;">A customer submitted a booking on ${escapeHtml(BRAND.name)}. Review in admin or reply to the customer directly.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;">${rows}</table>
  `;
}

export function bookingAdminEmailText(data: Record<string, string | number>) {
  const lines = Object.entries(data).map(([k, v]) => `${k}: ${v}`);
  return `New booking request on ${BRAND.name}\n\n${lines.join("\n")}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
