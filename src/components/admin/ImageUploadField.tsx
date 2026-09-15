"use client";

import { AdminImageField } from "@/components/admin/AdminImageField";
import type { UploadFolder } from "@/lib/upload-constants";

const LEGACY_FOLDER_MAP: Record<string, UploadFolder> = {
  settings: "pages",
  services: "products",
  blog: "pages",
  team: "pages",
  bookings: "misc",
  gallery: "gallery",
  products: "products",
  pages: "pages",
  misc: "misc",
};

export function ImageUploadField({
  folder,
  value,
  onChange,
  label,
}: {
  folder: string;
  value?: string;
  onChange: (url: string, publicId?: string) => void;
  label?: string;
}) {
  const mapped = LEGACY_FOLDER_MAP[folder] ?? "misc";
  return (
    <AdminImageField
      folder={mapped}
      value={value}
      label={label}
      onChange={(url) => onChange(url)}
    />
  );
}
