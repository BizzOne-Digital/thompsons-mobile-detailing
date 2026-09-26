"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "gold" | "outline" | "ghost";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  href,
  onClick,
  variant = "gold",
  className,
  children,
  type = "button",
  disabled,
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50",
    variant === "gold" &&
      "bg-gradient-to-r from-gold via-bright-gold to-soft-gold text-midnight shadow-[0_8px_30px_rgba(217,165,20,0.35)] md:hover:scale-[1.03]",
    variant === "outline" &&
      "gold-border text-off-white hover:bg-white/5",
    variant === "ghost" && "text-off-white hover:text-bright-gold",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  );
}
