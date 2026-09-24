import { Schema, models, model } from "mongoose";

export interface ITestimonial {
  customerName: string;
  rating: number;
  review: string;
  vehicle?: string;
  serviceReceived?: string;
  beforeImage?: { url: string; publicId?: string };
  afterImage?: { url: string; publicId?: string };
  reviewSource?: string;
  featured: boolean;
  approved: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    customerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    vehicle: String,
    serviceReceived: String,
    beforeImage: { url: String, publicId: String },
    afterImage: { url: String, publicId: String },
    reviewSource: String,
    featured: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial =
  models.Testimonial || model<ITestimonial>("Testimonial", TestimonialSchema);
