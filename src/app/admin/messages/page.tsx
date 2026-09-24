"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

type Message = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  replied: boolean;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then(setMessages);
  }, []);

  const patch = async (id: string, data: Record<string, unknown>) => {
    const res = await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) return toast.error("Update failed");
    toast.success("Updated");
    setMessages((prev) =>
      prev.map((m) => (m._id === id ? { ...m, ...data } as Message : m))
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-bright-gold">Messages</h1>
      <div className="space-y-4">
        {messages.map((m) => (
          <article key={m._id} className="glass-panel rounded-2xl p-4">
            <div className="flex justify-between gap-4">
              <div>
                <h2 className="font-semibold">{m.subject}</h2>
                <p className="text-sm text-off-white/70">{m.name} · {m.email}</p>
              </div>
              <div className="flex gap-2 text-xs">
                <button type="button" onClick={() => patch(m._id, { read: true })}>Mark read</button>
                <button type="button" onClick={() => patch(m._id, { replied: true })}>Mark replied</button>
                <button type="button" onClick={() => patch(m._id, { archived: true })}>Archive</button>
              </div>
            </div>
            <p className="mt-3 text-sm text-off-white/85">{m.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
