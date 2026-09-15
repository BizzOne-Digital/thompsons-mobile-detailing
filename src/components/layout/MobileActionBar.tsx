"use client";

import Link from "next/link";
import { Calendar, MessageSquare, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 w-full border-t border-gold/30 bg-navy/95 backdrop-blur lg:hidden">
      <div className="grid grid-cols-3 text-xs">
        <a
          href={BRAND.phoneHref}
          className="flex flex-col items-center gap-1 py-3 text-off-white/90"
        >
          <Phone className="h-4 w-4 text-gold" />
          Call
        </a>
        <a
          href={BRAND.smsHref}
          className="flex flex-col items-center gap-1 py-3 text-off-white/90"
        >
          <MessageSquare className="h-4 w-4 text-gold" />
          Text
        </a>
        <Link
          href="/booking"
          className="flex flex-col items-center gap-1 py-3 text-bright-gold font-semibold"
        >
          <Calendar className="h-4 w-4" />
          Book
        </Link>
      </div>
    </div>
  );
}
