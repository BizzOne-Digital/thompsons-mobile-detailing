"use client";

import { useSiteSettings } from "@/components/layout/SiteSettingsProvider";

export function AnnouncementBar() {
  const { announcementBar } = useSiteSettings();
  if (!announcementBar.trim()) return null;

  return (
    <div className="relative z-[60] w-full border-b border-gold/30 bg-royal/90 px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
      {announcementBar}
    </div>
  );
}
