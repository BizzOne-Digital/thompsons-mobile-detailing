"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { contactSchema } from "@/lib/validations";
import { Button } from "@/components/ui/Button";

type FormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { preferredResponse: "phone" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error || "Failed to send message");
      return;
    }
    toast.success("Message sent successfully.");
    form.reset();
  });

  const inputClass =
    "mt-2 w-full rounded-xl border border-gold/30 bg-midnight px-4 py-3";

  return (
    <form onSubmit={onSubmit} className="glass-panel space-y-4 rounded-3xl p-6">
      <input placeholder="Name" className={inputClass} {...form.register("name")} />
      <input placeholder="Email" className={inputClass} {...form.register("email")} />
      <input placeholder="Phone" className={inputClass} {...form.register("phone")} />
      <input placeholder="Subject" className={inputClass} {...form.register("subject")} />
      <textarea
        placeholder="Message"
        className={`${inputClass} min-h-32`}
        {...form.register("message")}
      />
      <select className={inputClass} {...form.register("preferredResponse")}>
        <option value="phone">Phone</option>
        <option value="email">Email</option>
        <option value="text">Text</option>
      </select>
      <Button type="submit">Send Message</Button>
    </form>
  );
}
