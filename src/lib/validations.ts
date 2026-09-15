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

export const bookingSchema = z.object({
  customerName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  preferredContactMethod: z.enum(["email", "phone", "text"]),
  serviceId: z.string().min(1),
  vehicleType: z.enum(["sedan", "midsize", "large"]),
  vehicleYear: z.string().optional(),
  vehicleMake: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleColor: z.string().optional(),
  vehicleCondition: z.string().optional(),
  addOnIds: z.array(z.string()).default([]),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  alternateDate: z.string().optional(),
  alternateTime: z.string().optional(),
  address: z.string().min(5),
  city: z.string().min(2),
  zip: z.string().min(5),
  locationType: z.string().min(2),
  accessInstructions: z.string().optional(),
  petHair: z.boolean().default(false),
  majorStains: z.boolean().default(false),
  odorTreatment: z.boolean().default(false),
  customerNotes: z.string().optional(),
  photos: z
    .array(z.object({ url: z.string().url(), publicId: z.string().optional() }))
    .default([]),
});
