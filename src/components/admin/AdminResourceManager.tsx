"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AdminResourceManager({
  title,
  endpoint,
  fields,
}: {
  title: string;
  endpoint: string;
  fields: { key: string; label: string; type?: "text" | "textarea" | "checkbox" }[];
}) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [draft, setDraft] = useState<Record<string, unknown>>({});

  const load = () => {
    fetch(endpoint)
      .then((r) => r.json())
      .then(setItems)
      .catch(() => toast.error(`Failed to load ${title}`));
  };

  useEffect(() => {
    load();
  }, [endpoint]);

  const save = async () => {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    if (!res.ok) {
      toast.error("Save failed");
      return;
    }
    toast.success("Created");
    setDraft({});
    load();
  };

  const update = async (id: string, patch: Record<string, unknown>) => {
    const res = await fetch(`${endpoint}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!res.ok) {
      toast.error("Update failed");
      return;
    }
    toast.success("Updated");
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Delete failed");
      return;
    }
    toast.success("Deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-bright-gold">{title}</h1>
      <div className="glass-panel space-y-3 rounded-2xl p-4">
        <h2 className="font-semibold">Add New</h2>
        {fields.map((field) => (
          <label key={field.key} className="block text-sm">
            {field.label}
            {field.type === "textarea" ? (
              <textarea
                className="mt-1 w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
                value={String(draft[field.key] ?? "")}
                onChange={(e) =>
                  setDraft({ ...draft, [field.key]: e.target.value })
                }
              />
            ) : field.type === "checkbox" ? (
              <input
                type="checkbox"
                className="ml-2"
                checked={Boolean(draft[field.key])}
                onChange={(e) =>
                  setDraft({ ...draft, [field.key]: e.target.checked })
                }
              />
            ) : (
              <input
                className="mt-1 w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
                value={String(draft[field.key] ?? "")}
                onChange={(e) =>
                  setDraft({ ...draft, [field.key]: e.target.value })
                }
              />
            )}
          </label>
        ))}
        <button
          type="button"
          onClick={save}
          className="rounded-full bg-gold px-4 py-2 text-midnight"
        >
          Create
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item) => {
          const id = String(item._id);
          return (
            <div key={id} className="glass-panel rounded-2xl p-4">
              <div className="grid gap-2 md:grid-cols-2">
                {fields.map((field) => (
                  <label key={field.key} className="text-sm">
                    {field.label}
                    <input
                      className="mt-1 w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
                      value={String(item[field.key] ?? "")}
                      onChange={(e) => {
                        item[field.key] = e.target.value;
                        setItems([...items]);
                      }}
                    />
                  </label>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="rounded-full bg-gold px-4 py-2 text-midnight text-sm"
                  onClick={() => update(id, item)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="text-sm text-red-300"
                  onClick={() => remove(id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
