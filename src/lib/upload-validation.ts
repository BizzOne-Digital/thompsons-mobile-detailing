import { extensionForMime, isUploadFolder } from "@/lib/stored-upload-url";
import {
  UPLOAD_MAX_BYTES,
  UPLOAD_MIME_TYPES,
  type UploadFolder,
} from "@/lib/upload-constants";
import crypto from "crypto";

export function validateUploadFile(file: File) {
  if (!UPLOAD_MIME_TYPES.includes(file.type as (typeof UPLOAD_MIME_TYPES)[number])) {
    return { ok: false as const, error: "Invalid file type" };
  }
  if (file.size > UPLOAD_MAX_BYTES) {
    return { ok: false as const, error: "File exceeds 8MB limit" };
  }
  return { ok: true as const };
}

export function validateUploadFolder(folder: string) {
  if (!isUploadFolder(folder)) {
    return { ok: false as const, error: "Invalid folder" };
  }
  return { ok: true as const, folder: folder as UploadFolder };
}

export function generateUploadFilename(mimeType: string) {
  const ext = extensionForMime(mimeType);
  return `${Date.now()}-${crypto.randomBytes(8).toString("hex")}.${ext}`;
}
