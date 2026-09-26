import { Schema, models, model } from "mongoose";
import { GALLERY_CATEGORIES } from "@/lib/constants";

export interface IGalleryItem {
  title: string;
  category: (typeof GALLERY_CATEGORIES)[number];
  beforeImage: { url: string; alt?: string; publicId?: string };
  afterImage: { url: string; alt?: string; publicId?: string };
  caption?: string;
  vehicleInfo?: string;
  serviceSlug?: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: true },
    category: { type: String, enum: GALLERY_CATEGORIES, required: true },
    beforeImage: {
      url: { type: String, required: true },
      alt: String,
      publicId: String,
    },
    afterImage: {
      url: { type: String, required: true },
      alt: String,
      publicId: String,
    },
    caption: String,
    vehicleInfo: String,
    serviceSlug: String,
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const GalleryItem =
  models.GalleryItem || model<IGalleryItem>("GalleryItem", GalleryItemSchema);
