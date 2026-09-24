import { v2 as cloudinary } from "cloudinary";

export function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return false;
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  return true;
}

export async function uploadBuffer(
  buffer: Buffer,
  folder: string,
  publicId?: string
) {
  if (!configureCloudinary()) {
    throw new Error("Cloudinary is not configured");
  }

  return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `thompsons/${folder}`,
        public_id: publicId,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload failed"));
          return;
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );
    uploadStream.end(buffer);
  });
}

export async function deleteCloudinaryImage(publicId: string) {
  if (!configureCloudinary()) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch {
    // ignore safe cleanup failures
  }
}
