import { connectDB } from "@/lib/mongodb";
import { isUploadFolder } from "@/lib/stored-upload-url";
import { StoredUpload } from "@/models/StoredUpload";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ folder: string; filename: string }> }
) {
  const { folder, filename } = await context.params;

  if (!isUploadFolder(folder)) {
    return new Response("Not found", { status: 404 });
  }

  if (
    !filename ||
    filename.includes("..") ||
    filename.includes("/") ||
    filename.includes("\\") ||
    !/^[a-zA-Z0-9._-]+$/.test(filename)
  ) {
    return new Response("Not found", { status: 404 });
  }

  await connectDB();
  const doc = await StoredUpload.findOne({ folder, filename });

  if (!doc?.data) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(doc.data), {
    status: 200,
    headers: {
      "Content-Type": doc.mimeType,
      "Content-Length": String(doc.size),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
