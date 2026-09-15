"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FaqItem = { _id: string; question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?._id ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const open = openId === item._id;
        return (
          <div key={item._id} className="glass-panel rounded-xl overflow-hidden">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item._id)}
            >
              <span className="font-medium text-off-white">{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-gold transition-transform",
                  open && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "px-5 text-sm text-off-white/75 transition-all",
                open ? "pb-4 max-h-96" : "max-h-0 overflow-hidden pb-0"
              )}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
