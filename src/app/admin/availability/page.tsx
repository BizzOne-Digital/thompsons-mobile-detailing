"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminAvailabilityPage() {
  const [config, setConfig] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch("/api/admin/availability")
      .then((r) => r.json())
      .then(setConfig);
  }, []);

  const save = async () => {
    const res = await fetch("/api/admin/availability", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    if (!res.ok) return toast.error("Save failed");
    toast.success("Availability updated");
  };

  if (!config) return <p>Loading…</p>;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-bright-gold">Availability</h1>
      <div className="glass-panel space-y-4 rounded-2xl p-4">
        <label className="block text-sm">
          Appointment interval (minutes)
          <input
            type="number"
            className="mt-1 w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
            value={String(config.appointmentIntervalMinutes ?? 60)}
            onChange={(e) =>
              setConfig({
                ...config,
                appointmentIntervalMinutes: Number(e.target.value),
              })
            }
          />
        </label>
        <label className="block text-sm">
          Max bookings per day
          <input
            type="number"
            className="mt-1 w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
            value={String(config.maxBookingsPerDay ?? 6)}
            onChange={(e) =>
              setConfig({
                ...config,
                maxBookingsPerDay: Number(e.target.value),
              })
            }
          />
        </label>
        <label className="block text-sm">
          Minimum advance notice (hours)
          <input
            type="number"
            className="mt-1 w-full rounded-xl border border-gold/30 bg-midnight px-3 py-2"
            value={String(config.minAdvanceNoticeHours ?? 24)}
            onChange={(e) =>
              setConfig({
                ...config,
                minAdvanceNoticeHours: Number(e.target.value),
              })
            }
          />
        </label>
        <button type="button" onClick={save} className="rounded-full bg-gold px-4 py-2 text-midnight">
          Save Availability
        </button>
      </div>
    </div>
  );
}
