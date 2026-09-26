"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error || "Login failed");
      return;
    }
    router.push("/admin");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="font-display text-3xl text-bright-gold">Admin Login</h1>
      <form onSubmit={submit} className="mt-8 space-y-4 glass-panel rounded-3xl p-6">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-gold/30 bg-midnight px-4 py-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-gold/30 bg-midnight px-4 py-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
    </div>
  );
}
