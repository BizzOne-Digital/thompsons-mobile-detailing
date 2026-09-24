"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type TeamRow = {
  _id: string;
  name: string;
  role: string;
  biography: string;
  active: boolean;
  displayOrder?: number;
  photo?: { url: string };
};

export function AdminTeamManager() {
  const [items, setItems] = useState<TeamRow[]>([]);
  const [draft, setDraft] = useState({
    name: "",
    role: "",
    biography: "",
    active: true,
  });

  const load = () =>
    fetch("/api/admin/team")
      .then((r) => r.json())
      .then(setItems);

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    const res = await fetch("/api/admin/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    if (!res.ok) return toast.error("Create failed");
    toast.success("Team member added");
    setDraft({ name: "", role: "", biography: "", active: true });
    load();
  };

  const patch = async (id: string, body: Record<string, unknown>) => {
    const res = await fetch(`/api/admin/team/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return toast.error("Update failed");
    toast.success("Updated");
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Remove team member?")) return;
    const res = await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
    if (!res.ok) return toast.error("Delete failed");
    toast.success("Deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-bright-gold">Team</h1>
      <div className="glass-panel space-y-3 rounded-2xl p-4">
        <h2 className="font-semibold">Add member</h2>
        {(["name", "role"] as const).map((key) => (
          <input
            key={key}
            placeholder={key}
            className="w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
            value={draft[key]}
            onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
          />
        ))}
        <textarea
          placeholder="Biography"
          className="w-full min-h-24 rounded-xl border border-gold/30 bg-midnight px-3 py-2"
          value={draft.biography}
          onChange={(e) => setDraft({ ...draft, biography: e.target.value })}
        />
        <button type="button" onClick={create} className="rounded-full bg-gold px-4 py-2 text-midnight">
          Add
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="glass-panel space-y-3 rounded-2xl p-4">
            <input
              className="w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
              value={item.name}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((r) =>
                    r._id === item._id ? { ...r, name: e.target.value } : r
                  )
                )
              }
            />
            <input
              className="w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
              value={item.role}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((r) =>
                    r._id === item._id ? { ...r, role: e.target.value } : r
                  )
                )
              }
            />
            <textarea
              className="w-full min-h-24 rounded-xl border border-gold/30 bg-midnight px-3 py-2"
              value={item.biography}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((r) =>
                    r._id === item._id ? { ...r, biography: e.target.value } : r
                  )
                )
              }
            />
            <ImageUploadField
              folder="team"
              label="Photo"
              value={item.photo?.url}
              onChange={(url) => patch(item._id, { photo: { url } })}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={item.active}
                onChange={(e) => patch(item._id, { active: e.target.checked })}
              />
              Show on website
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-full bg-gold px-4 py-2 text-sm text-midnight"
                onClick={() =>
                  patch(item._id, {
                    name: item.name,
                    role: item.role,
                    biography: item.biography,
                  })
                }
              >
                Save
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
