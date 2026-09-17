"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type ServiceRow = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  startingPrice: number;
  estimatedDuration?: string;
  displayOrder?: number;
  active: boolean;
  featured: boolean;
  images?: { url: string; alt?: string }[];
};

export function AdminServicesManager() {
  const [items, setItems] = useState<ServiceRow[]>([]);

  const load = () =>
    fetch("/api/admin/services")
      .then((r) => r.json())
      .then(setItems);

  useEffect(() => {
    load();
  }, []);

  const patch = async (id: string, body: Record<string, unknown>) => {
    const res = await fetch(`/api/admin/services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return toast.error("Update failed");
    toast.success("Service updated");
    load();
  };

  const setHeroImage = (id: string, url: string, name: string) => {
    patch(id, { images: [{ url, alt: name }] });
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-bright-gold">Services</h1>
      <p className="text-sm text-off-white/65">
        Changes here appear on pricing, booking, and service detail pages immediately.
      </p>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="glass-panel space-y-3 rounded-2xl p-4">
            <div className="grid gap-2 md:grid-cols-2">
              <label className="text-sm">
                Name
                <input
                  className="mt-1 w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
                  value={item.name}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((r) =>
                        r._id === item._id ? { ...r, name: e.target.value } : r
                      )
                    )
                  }
                />
              </label>
              <label className="text-sm">
                Slug
                <input
                  className="mt-1 w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
                  value={item.slug}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((r) =>
                        r._id === item._id ? { ...r, slug: e.target.value } : r
                      )
                    )
                  }
                />
              </label>
            </div>
            <label className="block text-sm">
              Short description
              <textarea
                className="mt-1 w-full min-h-20 rounded-xl border border-gold/30 bg-midnight px-3 py-2"
                value={item.shortDescription}
                onChange={(e) =>
                  setItems((prev) =>
                    prev.map((r) =>
                      r._id === item._id
                        ? { ...r, shortDescription: e.target.value }
                        : r
                    )
                  )
                }
              />
            </label>
            <label className="block text-sm">
              Full description
              <textarea
                className="mt-1 w-full min-h-28 rounded-xl border border-gold/30 bg-midnight px-3 py-2"
                value={item.fullDescription}
                onChange={(e) =>
                  setItems((prev) =>
                    prev.map((r) =>
                      r._id === item._id
                        ? { ...r, fullDescription: e.target.value }
                        : r
                    )
                  )
                }
              />
            </label>
            <div className="grid gap-2 md:grid-cols-3">
              <label className="text-sm">
                Starting price
                <input
                  type="number"
                  className="mt-1 w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
                  value={item.startingPrice}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((r) =>
                        r._id === item._id
                          ? { ...r, startingPrice: Number(e.target.value) }
                          : r
                      )
                    )
                  }
                />
              </label>
              <label className="text-sm">
                Duration (e.g. 4–6 hours)
                <input
                  className="mt-1 w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
                  value={item.estimatedDuration ?? ""}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((r) =>
                        r._id === item._id
                          ? { ...r, estimatedDuration: e.target.value }
                          : r
                      )
                    )
                  }
                />
              </label>
              <label className="text-sm">
                Display order
                <input
                  type="number"
                  className="mt-1 w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
                  value={item.displayOrder ?? 0}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((r) =>
                        r._id === item._id
                          ? { ...r, displayOrder: Number(e.target.value) }
                          : r
                      )
                    )
                  }
                />
              </label>
            </div>
            <ImageUploadField
              folder="services"
              label="Hero / cover image (service page)"
              value={item.images?.[0]?.url}
              onChange={(url) => setHeroImage(item._id, url, item.name)}
            />
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((r) =>
                        r._id === item._id ? { ...r, active: e.target.checked } : r
                      )
                    )
                  }
                />
                Active on site
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.featured}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((r) =>
                        r._id === item._id
                          ? { ...r, featured: e.target.checked }
                          : r
                      )
                    )
                  }
                />
                Featured
              </label>
            </div>
            <button
              type="button"
              className="rounded-full bg-gold px-4 py-2 text-sm text-midnight"
              onClick={() =>
                patch(item._id, {
                  name: item.name,
                  slug: item.slug,
                  shortDescription: item.shortDescription,
                  fullDescription: item.fullDescription,
                  startingPrice: item.startingPrice,
                  estimatedDuration: item.estimatedDuration,
                  displayOrder: item.displayOrder,
                  active: item.active,
                  featured: item.featured,
                })
              }
            >
              Save service
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
