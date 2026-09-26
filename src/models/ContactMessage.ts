import { Schema, models, model } from "mongoose";

export interface IContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredResponse: string;
  read: boolean;
  replied: boolean;
  archived: boolean;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    subject: { type: String, required: true },
    message: { type: String, required: true },
    preferredResponse: { type: String, required: true },
    read: { type: Boolean, default: false },
    replied: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
    adminNotes: String,
  },
  { timestamps: true }
);

export const ContactMessage =
  models.ContactMessage ||
  model<IContactMessage>("ContactMessage", ContactMessageSchema);
