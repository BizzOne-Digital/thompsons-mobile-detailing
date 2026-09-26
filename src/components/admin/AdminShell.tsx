"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/add-ons", label: "Add-Ons" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/availability", label: "Availability" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-midnight text-off-white">
      <div className="border-b border-gold/20 bg-navy/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <p className="font-display text-bright-gold">TMD Admin Portal</p>
          <button
            type="button"
            onClick={logout}
            className="text-sm text-off-white/70 hover:text-bright-gold"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="mx-auto grid w-full min-w-0 max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-1 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-lg px-3 py-2 hover:bg-white/5",
                pathname === link.href && "bg-gold/20 text-bright-gold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
