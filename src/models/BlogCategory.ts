import { Schema, models, model } from "mongoose";

export interface IBlogCategory {
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogCategorySchema = new Schema<IBlogCategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
  },
  { timestamps: true }
);

export const BlogCategory =
  models.BlogCategory ||
  model<IBlogCategory>("BlogCategory", BlogCategorySchema);
