import mongoose, { Schema, models, model } from "mongoose";

export interface IBlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: { url: string; alt?: string; publicId?: string };
  categoryIds: mongoose.Types.ObjectId[];
  tags: string[];
  status: "draft" | "published" | "scheduled";
  publishedAt?: Date;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { url: String, alt: String, publicId: String },
    categoryIds: [{ type: Schema.Types.ObjectId, ref: "BlogCategory" }],
    tags: [String],
    status: {
      type: String,
      enum: ["draft", "published", "scheduled"],
      default: "draft",
    },
    publishedAt: Date,
    featured: { type: Boolean, default: false },
    seoTitle: String,
    seoDescription: String,
    readingTime: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const BlogPost =
  models.BlogPost || model<IBlogPost>("BlogPost", BlogPostSchema);
