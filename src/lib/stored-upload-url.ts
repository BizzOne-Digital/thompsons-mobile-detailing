import { UPLOAD_FOLDERS, type UploadFolder } from "@/lib/upload-constants";

export function isUploadFolder(value: string): value is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(value);
}

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function extensionForMime(mimeType: string) {
  return MIME_TO_EXT[mimeType] ?? "bin";
}

export function buildStoredUploadUrl(folder: UploadFolder, filename: string) {
  return `/api/uploads/${folder}/${filename}`;
}

export function parseStoredUploadUrl(url: string): {
  folder: UploadFolder;
  filename: string;
} | null {
  if (!url.startsWith("/api/uploads/")) return null;
  const parts = url.replace(/^\/api\/uploads\//, "").split("/");
  if (parts.length !== 2) return null;
  const [folder, filename] = parts;
  if (!folder || !filename) return null;
  if (!isUploadFolder(folder)) return null;
  if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return null;
  }
  if (!/^[a-zA-Z0-9._-]+$/.test(filename)) return null;
  return { folder, filename };
}

export function isStoredUploadUrl(url?: string | null) {
  return Boolean(url?.startsWith("/api/uploads/"));
}
