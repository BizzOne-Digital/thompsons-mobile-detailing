"use client";

import { Toaster } from "sonner";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      {children}
      <Toaster richColors position="top-right" theme="dark" />
    </SmoothScrollProvider>
  );
}
