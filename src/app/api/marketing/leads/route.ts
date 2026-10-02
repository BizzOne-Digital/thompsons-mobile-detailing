import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { getPromoConfig } from "@/lib/marketing-config";
import { getSiteUrl } from "@/lib/site-url";
import {
  marketingLeadAdminEmailHtml,
  marketingLeadAdminEmailText,
  promoOfferEmailHtml,
  promoOfferEmailText,
  sendMail,
} from "@/lib/email";
import { BRAND } from "@/lib/constants";
import { apiError } from "@/lib/utils";
import { MarketingLead } from "@/models/MarketingLead";

const leadSchema = z.object({
  email: z.string().email(),
  name: z.string().max(100).optional(),
  phone: z.string().max(40).optional(),
  source: z.enum(["popup_email", "promo_claim", "booking_abandoned"]),
  pagePath: z.string().max(500).optional(),
  bookingStep: z.number().int().min(0).max(20).optional(),
  serviceName: z.string().max(200).optional(),
});

const FOLLOW_UP_COOLDOWN_MS = 24 * 60 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return apiError("Invalid lead data", 400);
    }

    const promo = getPromoConfig();
    if (!promo.enabled && parsed.data.source !== "booking_abandoned") {
      return apiError("Promo offers are not active", 503);
    }

    const conn = await connectDB();
    if (!conn) {
      return apiError("Lead capture is temporarily unavailable", 503);
    }

    const email = parsed.data.email.toLowerCase().trim();
    const { source, name, phone, pagePath, bookingStep, serviceName } =
      parsed.data;

    const recent = await MarketingLead.findOne({
      email,
      source,
      createdAt: { $gte: new Date(Date.now() - FOLLOW_UP_COOLDOWN_MS) },
    }).lean();

    if (recent) {
      return Response.json({ ok: true, duplicate: true, code: promo.code });
    }

    const bookingUrl = `${getSiteUrl()}/booking?promo=${encodeURIComponent(promo.code)}`;

    const lead = await MarketingLead.create({
      email,
      name,
      phone,
      source,
      promoCode: promo.code,
      pagePath,
      bookingStep,
      serviceName,
    });

    let followUpSent = false;

    if (source === "popup_email" || source === "booking_abandoned") {
      const mail = await sendMail({
        to: email,
        subject: `${promo.headline} — ${BRAND.name}`,
        html: promoOfferEmailHtml({
          customerName: name,
          headline: promo.headline,
          code: promo.code,
          percent: promo.percent,
          terms: promo.terms,
          bookingUrl,
        }),
        text: promoOfferEmailText({
          customerName: name,
          headline: promo.headline,
          code: promo.code,
          percent: promo.percent,
          terms: promo.terms,
          bookingUrl,
        }),
      });
      followUpSent = mail.ok;
      if (followUpSent) {
        await MarketingLead.updateOne(
          { _id: lead._id },
          { $set: { followUpSentAt: new Date() } }
        );
      }
    }

    const notifyEmail =
      process.env.BOOKING_NOTIFICATION_EMAIL?.trim() || BRAND.email;
    const adminPayload: Record<string, string> = {
      Source: source,
      Email: email,
      Name: name || "—",
      Phone: phone || "—",
      "Promo code": promo.code,
      Page: pagePath || "—",
    };
    if (serviceName) adminPayload.Service = serviceName;
    if (bookingStep != null) adminPayload["Booking step"] = String(bookingStep);

    await sendMail({
      to: notifyEmail,
      subject: `Marketing lead (${source}): ${email}`,
      html: marketingLeadAdminEmailHtml(adminPayload),
      text: marketingLeadAdminEmailText(adminPayload),
    });

    return Response.json({
      ok: true,
      followUpSent,
      code: promo.code,
    });
  } catch (err) {
    console.error("[marketing/leads] POST failed:", err);
    return apiError("Could not save lead", 500);
  }
}
