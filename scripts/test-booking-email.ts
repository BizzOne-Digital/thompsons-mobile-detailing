/** Sends sample booking emails (customer + admin). Run: npm run test-booking-email */
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

import { BRAND } from "../src/lib/constants";
import {
  bookingAdminEmailHtml,
  bookingAdminEmailText,
  bookingCustomerEmailHtml,
  bookingCustomerEmailText,
  isSmtpConfigured,
  sendMail,
} from "../src/lib/email";

async function main() {
  if (!isSmtpConfigured()) {
    console.error("SMTP not configured in .env.local");
    process.exit(1);
  }

  const sample = {
    customerName: "Test Customer",
    serviceName: "Refresh Detail",
    preferredDate: "2026-09-25",
    preferredTime: "9:00 AM",
    estimatedPrice: 169,
  };

  const adminTo =
    process.env.BOOKING_NOTIFICATION_EMAIL?.trim() || BRAND.email;

  const customer = await sendMail({
    to: adminTo,
    subject: `[TEST] Your booking request — ${BRAND.name}`,
    text: bookingCustomerEmailText(sample),
    html: bookingCustomerEmailHtml(sample),
  });
  console.log("Customer template:", customer);

  const admin = await sendMail({
    to: adminTo,
    subject: `[TEST] New booking: Test Customer — Refresh Detail`,
    replyTo: BRAND.email,
    text: bookingAdminEmailText({
      Customer: sample.customerName,
      Service: sample.serviceName,
    }),
    html: bookingAdminEmailHtml({
      Customer: sample.customerName,
      Service: sample.serviceName,
    }),
  });
  console.log("Admin template:", admin);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
