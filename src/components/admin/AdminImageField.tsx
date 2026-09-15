"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { resolveImageSrc } from "@/lib/image-resolve";
import type { UploadFolder } from "@/lib/upload-constants";

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif";

export function AdminImageField({
  folder,
  value,
  onChange,
  label,
}: {
  folder: UploadFolder;
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const displaySrc = resolveImageSrc(value);

  const deleteStored = async (url: string) => {
    if (!url.startsWith("/api/uploads/")) return;
    const res = await fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to remove image");
    }
  };

  const upload = async (file: File, replaceUrl?: string) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      if (replaceUrl) fd.append("replaceUrl", replaceUrl);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      onChange(data.url as string);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    if (!value) return;
    setUploading(true);
    try {
      if (value.startsWith("/api/uploads/")) {
        await deleteStored(value);
      }
      onChange("");
      toast.success("Image removed");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Remove failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3 rounded-xl border border-gold/20 p-4">
      {label && <p className="text-sm font-medium text-off-white/90">{label}</p>}
      {value ? (
        <Image
          src={displaySrc}
          alt="Upload preview"
          width={240}
          height={140}
          className="h-36 w-full max-w-xs rounded-lg object-cover"
          unoptimized={value.startsWith("/api/uploads/")}
        />
      ) : (
        <div className="flex h-36 max-w-xs items-center justify-center rounded-lg border border-dashed border-gold/30 text-xs text-off-white/50">
          No image selected
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file, value || undefined);
        }}
      />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-midnight disabled:opacity-50"
        >
          {value ? "Replace" : "Upload"}
        </button>
        {value && (
          <button
            type="button"
            disabled={uploading}
            onClick={handleRemove}
            className="rounded-full border border-red-400/50 px-4 py-2 text-sm text-red-200 disabled:opacity-50"
          >
            Remove
          </button>
        )}
      </div>
      {uploading && <p className="text-xs text-off-white/60">Uploading…</p>}
    </div>
  );
}
