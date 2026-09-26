import { withAdminAuth } from "@/lib/api-auth";
import { connectDB } from "@/lib/mongodb";
import {
  buildStoredUploadUrl,
  deleteStoredUploadByUrl,
  parseStoredUploadUrl,
} from "@/lib/stored-uploads";
import {
  generateUploadFilename,
  validateUploadFile,
  validateUploadFolder,
} from "@/lib/upload-validation";
import { apiError } from "@/lib/utils";
import { StoredUpload } from "@/models/StoredUpload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return withAdminAuth(async () => {
    const formData = await request.formData();
    const file = formData.get("file");
    const folderRaw = (formData.get("folder") as string) || "misc";
    const replaceUrl = formData.get("replaceUrl") as string | null;

    if (!(file instanceof File)) {
      return apiError("file is required");
    }

    const folderCheck = validateUploadFolder(folderRaw);
    if (!folderCheck.ok) return apiError(folderCheck.error);

    const fileCheck = validateUploadFile(file);
    if (!fileCheck.ok) return apiError(fileCheck.error);

    await connectDB();

    if (replaceUrl && parseStoredUploadUrl(replaceUrl)) {
      await deleteStoredUploadByUrl(replaceUrl);
    }

    const filename = generateUploadFilename(file.type);
    const buffer = Buffer.from(await file.arrayBuffer());

    await StoredUpload.create({
      folder: folderCheck.folder,
      filename,
      mimeType: file.type,
      size: file.size,
      data: buffer,
    });

    const url = buildStoredUploadUrl(folderCheck.folder, filename);

    return Response.json({
      success: true,
      url,
      filename,
      size: file.size,
      folder: folderCheck.folder,
    });
  });
}

export async function DELETE(request: Request) {
  return withAdminAuth(async () => {
    const body = await request.json().catch(() => ({}));
    const url = typeof body.url === "string" ? body.url : "";
    if (!parseStoredUploadUrl(url)) {
      return apiError("Invalid or non-stored upload URL", 400);
    }
    const deleted = await deleteStoredUploadByUrl(url);
    if (!deleted) {
      return apiError("Upload not found", 404);
    }
    return Response.json({ success: true });
  });
}
