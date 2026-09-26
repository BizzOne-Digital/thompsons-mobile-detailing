import { connectDB } from "@/lib/mongodb";
import { StoredUpload } from "@/models/StoredUpload";
import { parseStoredUploadUrl } from "@/lib/stored-upload-url";

export {
  buildStoredUploadUrl,
  extensionForMime,
  isStoredUploadUrl,
  isUploadFolder,
  parseStoredUploadUrl,
} from "@/lib/stored-upload-url";
export { UPLOAD_FOLDERS, type UploadFolder } from "@/lib/upload-constants";
export { resolveImageSrc } from "@/lib/image-resolve";

export async function deleteStoredUploadByUrl(url: string) {
  const parsed = parseStoredUploadUrl(url);
  if (!parsed) return false;
  await connectDB();
  const result = await StoredUpload.deleteOne({
    folder: parsed.folder,
    filename: parsed.filename,
  });
  return result.deletedCount > 0;
}
