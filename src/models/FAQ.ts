import { Schema, models, model } from "mongoose";

export interface IFAQ {
  question: string;
  answer: string;
  displayOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const FAQ = models.FAQ || model<IFAQ>("FAQ", FAQSchema);
