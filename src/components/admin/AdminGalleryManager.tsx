"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type GalleryRow = {
  _id: string;
  title: string;
  category: string;
  beforeImage?: { url: string };
  afterImage?: { url: string };
  published: boolean;
  displayOrder?: number;
};

export function AdminGalleryManager() {
  const [items, setItems] = useState<GalleryRow[]>([]);
  const [draft, setDraft] = useState<{
    title: string;
    category: string;
    published: boolean;
    displayOrder: number;
    beforeImage?: { url: string };
    afterImage?: { url: string };
  }>({
    title: "",
    category: GALLERY_CATEGORIES[0],
    published: true,
    displayOrder: 0,
  });

  const load = () =>
    fetch("/api/admin/gallery")
      .then((r) => r.json())
      .then(setItems);

  useEffect(() => {
    load();
  }, []);

  const saveNew = async () => {
    if (!draft.title || !draft.beforeImage?.url || !draft.afterImage?.url) {
      toast.error("Title and both images are required");
      return;
    }
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    if (!res.ok) return toast.error("Save failed");
    toast.success("Gallery item created");
    setDraft({
      title: "",
      category: GALLERY_CATEGORIES[0],
      published: true,
      displayOrder: 0,
    });
    load();
  };

  const patch = async (id: string, body: Record<string, unknown>) => {
    const res = await fetch(`/api/admin/gallery/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return toast.error("Update failed");
    toast.success("Updated");
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this gallery item?")) return;
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (!res.ok) return toast.error("Delete failed");
    toast.success("Deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-bright-gold">Gallery</h1>
      <div className="glass-panel space-y-4 rounded-2xl p-4">
        <h2 className="font-semibold">Add before / after</h2>
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
        <button type="button" onClick={saveNew} className="rounded-full bg-gold px-4 py-2 text-midnight">
          Save new item
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="glass-panel space-y-3 rounded-2xl p-4">
            <input
              className="w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
              value={item.title}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((r) =>
                    r._id === item._id ? { ...r, title: e.target.value } : r
                  )
                )
              }
            />
            <select
              className="w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
              value={item.category}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((r) =>
                    r._id === item._id ? { ...r, category: e.target.value } : r
                  )
                )
              }
            >
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="grid gap-4 md:grid-cols-2">
              <ImageUploadField
                folder="gallery"
                label="Before"
                value={item.beforeImage?.url}
                onChange={(url) =>
                  patch(item._id, { beforeImage: { url } })
                }
              />
              <ImageUploadField
                folder="gallery"
                label="After"
                value={item.afterImage?.url}
                onChange={(url) =>
                  patch(item._id, { afterImage: { url } })
                }
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={item.published}
                onChange={(e) =>
                  patch(item._id, { published: e.target.checked })
                }
              />
              Published on website
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-full bg-gold px-4 py-2 text-sm text-midnight"
                onClick={() =>
                  patch(item._id, {
                    title: item.title,
                    category: item.category,
                  })
                }
              >
                Save title / category
              </button>
              <button
                type="button"
                className="text-sm text-red-300"
                onClick={() => remove(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
