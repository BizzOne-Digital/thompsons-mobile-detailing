"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "mb-8 w-full min-w-0 max-w-full md:mb-10",
        align === "center" && "mx-auto max-w-3xl text-center",
        className
      )}
    >
      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-full break-words font-display text-2xl font-semibold gold-gradient-text light-sweep sm:text-3xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 break-words text-base text-off-white/80 md:mt-4 md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
