import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const setupAdminSchema = z.object({
  token: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(12),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
  preferredResponse: z.enum(["email", "phone", "text"]),
});

/** Loose client payload shape — normalized and validated on the server before save */
export const bookingSchema = z.record(z.string(), z.unknown());

export function validateBookingRequiredFields(data: {
  email: string;
  phone: string;
  address: string;
}): string | null {
  const email = data.email.trim();
  if (!email || !z.string().email().safeParse(email).success) {
    return "A valid email address is required.";
  }
  const phone = data.phone.replace(/\s/g, "");
  if (phone.length < 7) {
    return "A phone number is required.";
  }
  if (!data.address.trim()) {
    return "Full service address is required (where the vehicle will be detailed).";
  }
  return null;
}

export function validateBookingContactFields(data: {
  email: string;
  phone: string;
}): string | null {
  return validateBookingRequiredFields({
    email: data.email,
    phone: data.phone,
    address: "—",
  });
}
