"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BOOKING_STATUSES } from "@/lib/constants";

type Booking = {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  estimatedPrice: number;
  internalNotes?: string;
};

export function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Booking | null>(null);

  const load = () => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (q) params.set("q", q);
    fetch(`/api/admin/bookings?${params}`)
      .then((r) => r.json())
      .then(setBookings)
      .catch(() => toast.error("Failed to load bookings"));
  };

  useEffect(() => {
    load();
  }, [status, q]);

  const updateBooking = async (id: string, patch: Record<string, unknown>) => {
    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!res.ok) {
      toast.error("Update failed");
      return;
    }
    toast.success("Booking updated");
    load();
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-bright-gold">Bookings</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/api/admin/bookings/export";
            }}
            className="rounded-full border border-gold/40 px-4 py-2 text-sm"
          >
            Export CSV
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <input
          placeholder="Search"
          className="rounded-xl border border-gold/30 bg-midnight px-4 py-2"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="rounded-xl border border-gold/30 bg-midnight px-4 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All statuses</option>
          {BOOKING_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto glass-panel rounded-2xl">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="p-3">Customer</th>
              <th className="p-3">Service</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Estimate</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr
                key={b._id}
                className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                onClick={() => setSelected(b)}
              >
                <td className="p-3">{b.customerName}</td>
                <td className="p-3">{b.serviceName}</td>
                <td className="p-3">
                  {new Date(b.preferredDate).toLocaleDateString()} {b.preferredTime}
                </td>
                <td className="p-3">{b.status}</td>
                <td className="p-3">${b.estimatedPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-xl font-semibold">{selected.customerName}</h2>
          <p className="text-sm text-off-white/70">{selected.email} · {selected.phone}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <select
              className="rounded-xl border border-gold/30 bg-midnight px-4 py-2"
              value={selected.status}
              onChange={(e) =>
                setSelected({ ...selected, status: e.target.value })
              }
            >
              {BOOKING_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Adjusted price"
              className="rounded-xl border border-gold/30 bg-midnight px-4 py-2"
              onChange={(e) =>
                setSelected({
                  ...selected,
                  estimatedPrice: Number(e.target.value),
                })
              }
            />
            <textarea
              className="md:col-span-2 rounded-xl border border-gold/30 bg-midnight px-4 py-2"
              placeholder="Internal notes"
              value={selected.internalNotes || ""}
              onChange={(e) =>
                setSelected({ ...selected, internalNotes: e.target.value })
              }
            />
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              className="rounded-full bg-gold px-4 py-2 text-midnight"
              onClick={() =>
                updateBooking(selected._id, {
                  status: selected.status,
                  internalNotes: selected.internalNotes,
                  adjustedPrice: selected.estimatedPrice,
                })
              }
            >
              Save Changes
            </button>
            <button
              type="button"
              className="text-sm text-off-white/70"
              onClick={() => window.print()}
            >
              Print Summary
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
