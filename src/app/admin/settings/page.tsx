"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then(setSettings);
  }, []);

  const save = async () => {
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    if (!res.ok) return toast.error("Save failed");
    toast.success("Settings updated");
  };

  if (!settings) return <p>Loading…</p>;

  const fields = [
    "businessName",
    "tagline",
    "mainHeadline",
    "aboutText",
    "phone",
    "email",
    "businessHours",
    "instagramUrl",
    "facebookUrl",
    "heroHeadline",
    "heroSubheadline",
    "heroDescription",
    "announcementBar",
    "defaultSeoTitle",
    "defaultSeoDescription",
    "googleReviewUrl",
    "bookingNotice",
    "footerText",
    "privacyPolicy",
    "termsOfService",
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-bright-gold">Website Settings</h1>
      <div className="glass-panel space-y-4 rounded-2xl p-4">
        {fields.map((key) => (
          <label key={key} className="block text-sm capitalize">
            {key.replace(/([A-Z])/g, " $1")}
            {key.includes("Text") || key.includes("Policy") || key.includes("Description") ? (
              <textarea
                className="mt-1 w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2 min-h-24"
                value={String(settings[key] ?? "")}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
              />
            ) : (
              <input
                className="mt-1 w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
                value={String(settings[key] ?? "")}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
              />
            )}
          </label>
        ))}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={Boolean(settings.maintenanceMode)}
            onChange={(e) =>
              setSettings({ ...settings, maintenanceMode: e.target.checked })
            }
          />
          Maintenance mode
        </label>
        <div>
          <p className="text-sm mb-2">Logo</p>
          <ImageUploadField
            folder="settings"
            value={String(settings.logoUrl ?? "")}
            onChange={(url) => setSettings({ ...settings, logoUrl: url })}
          />
        </div>
        <button type="button" onClick={save} className="rounded-full bg-gold px-4 py-2 text-midnight">
          Save Settings
        </button>
      </div>
    </div>
  );
}
