import { connectDB } from "@/lib/mongodb";
import { rateLimit } from "@/lib/rate-limit";
import { buildStoredUploadUrl } from "@/lib/stored-uploads";
import {
  generateUploadFilename,
  validateUploadFile,
} from "@/lib/upload-validation";
import { apiError } from "@/lib/utils";
import { StoredUpload } from "@/models/StoredUpload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const limited = rateLimit(`booking-upload:${ip}`, 10, 60 * 60 * 1000);
  if (!limited.allowed) {
    return apiError("Upload limit reached. Try again later.", 429);
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return apiError("file is required");
  }

  const fileCheck = validateUploadFile(file);
  if (!fileCheck.ok) return apiError(fileCheck.error);

  await connectDB();
  const folder = "misc";
  const filename = generateUploadFilename(file.type);
  const buffer = Buffer.from(await file.arrayBuffer());

  await StoredUpload.create({
    folder,
    filename,
    mimeType: file.type,
    size: file.size,
    data: buffer,
  });

  const url = buildStoredUploadUrl(folder, filename);
  return Response.json({ url, publicId: filename });
}
