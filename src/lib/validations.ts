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

/** Loose client payload — normalized on the server before save */
export const bookingSchema = z.record(z.string(), z.unknown());
