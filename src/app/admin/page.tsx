"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [data, setData] = useState<{
    stats: {
      total: number;
      newCount: number;
      confirmed: number;
      completed: number;
      cancelled: number;
      estimatedRevenue: number;
      unreadMessages: number;
      blogCount: number;
      galleryCount: number;
    };
    monthly: { _id: { year: number; month: number }; count: number }[];
    statusBreakdown: { _id: string; count: number }[];
    recent: { customerName: string; serviceName: string; status: string }[];
  } | null>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return <p className="text-off-white/70">Loading dashboard…</p>;
  }

  const chartData = data.monthly.map((m) => ({
    name: `${m._id.month}/${m._id.year}`,
    bookings: m.count,
  }));

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl text-bright-gold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Total Bookings", data.stats.total],
          ["New Requests", data.stats.newCount],
          ["Confirmed", data.stats.confirmed],
          ["Completed", data.stats.completed],
          ["Cancelled", data.stats.cancelled],
          ["Est. Revenue", formatCurrency(data.stats.estimatedRevenue)],
          ["Unread Messages", data.stats.unreadMessages],
          ["Gallery Items", data.stats.galleryCount],
        ].map(([label, value]) => (
          <div key={label} className="glass-panel rounded-2xl p-4">
            <p className="text-xs text-off-white/60">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-2xl p-4 h-80">
        <h2 className="mb-4 font-semibold">Monthly Bookings</h2>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="bookings" fill="#d9a514" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-panel rounded-2xl p-4">
        <h2 className="mb-4 font-semibold">Recent Booking Requests</h2>
        <ul className="space-y-2 text-sm">
          {data.recent.map((b, i) => (
            <li key={i} className="flex justify-between border-b border-white/10 py-2">
              <span>{b.customerName} — {b.serviceName}</span>
              <span className="text-bright-gold">{b.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
