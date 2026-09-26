"use client";

import { createContext, useContext } from "react";
import {
  type PublicSiteSettings,
  toPublicSiteSettings,
} from "@/lib/public-settings";

const SiteSettingsContext = createContext<PublicSiteSettings>(
  toPublicSiteSettings(null)
);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: PublicSiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
