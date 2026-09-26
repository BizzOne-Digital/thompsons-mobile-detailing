import { Schema, model, models } from "mongoose";
import { UPLOAD_FOLDERS, type UploadFolder } from "@/lib/upload-constants";

export interface IStoredUpload {
  folder: UploadFolder;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

const StoredUploadSchema = new Schema<IStoredUpload>(
  {
    folder: { type: String, required: true, enum: UPLOAD_FOLDERS },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

StoredUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });

export const StoredUpload =
  models.StoredUpload ||
  model<IStoredUpload>("StoredUpload", StoredUploadSchema);
