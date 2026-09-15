"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type Item = {
  _id?: string;
  title: string;
  category: string;
  beforeImage?: { url: string };
  afterImage?: { url: string };
  published: boolean;
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [draft, setDraft] = useState<Item>({
    title: "",
    category: GALLERY_CATEGORIES[0],
    published: true,
  });

  const load = () =>
    fetch("/api/admin/gallery")
      .then((r) => r.json())
      .then(setItems);

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    if (!res.ok) return toast.error("Save failed");
    toast.success("Gallery item created");
    setDraft({ title: "", category: GALLERY_CATEGORIES[0], published: true });
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-bright-gold">Gallery</h1>
      <div className="glass-panel space-y-4 rounded-2xl p-4">
        <input
          placeholder="Title"
          className="w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
        <select
          className="w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
          value={draft.category}
          onChange={(e) => setDraft({ ...draft, category: e.target.value })}
        >
          {GALLERY_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div className="grid gap-4 md:grid-cols-2">
          <ImageUploadField
            folder="gallery"
            label="Before image"
            value={draft.beforeImage?.url}
            onChange={(url) =>
              setDraft({ ...draft, beforeImage: { url } })
            }
          />
          <ImageUploadField
            folder="gallery"
            label="After image"
            value={draft.afterImage?.url}
            onChange={(url) =>
              setDraft({ ...draft, afterImage: { url } })
            }
          />
        </div>
        <button type="button" onClick={save} className="rounded-full bg-gold px-4 py-2 text-midnight">
          Save Gallery Item
        </button>
      </div>
      <p className="text-sm text-off-white/60">{items.length} items loaded.</p>
    </div>
  );
}
