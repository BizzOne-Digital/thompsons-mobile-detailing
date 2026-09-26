"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND, INTRO_STORAGE_KEY } from "@/lib/constants";

function hasSeenIntro() {
  if (typeof window === "undefined") return true;
  return Boolean(sessionStorage.getItem(INTRO_STORAGE_KEY));
}

export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (hasSeenIntro()) {
        onCompleteRef.current();
        setReady(true);
        return;
      }
      setVisible(true);
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
      setVisible(false);
      onCompleteRef.current();
    }, 2800);
    return () => clearTimeout(timer);
  }, [visible]);

  const skip = useCallback(() => {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    setVisible(false);
    onCompleteRef.current();
  }, []);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-midnight"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-bright-gold to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-sky-300/60"
                style={{ left: `${(i * 17) % 100}%`, top: `${(i * 29) % 100}%` }}
                animate={{ y: [0, -12, 0], opacity: [0.2, 0.9, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.05 }}
              />
            ))}
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="relative text-center"
          >
            <Image
              src="/logo.jpg"
              alt={BRAND.name}
              width={160}
              height={160}
              className="mx-auto rounded-full shadow-[0_0_60px_rgba(217,165,20,0.45)]"
              priority
            />
            <p className="mt-6 font-display text-xl tracking-[0.2em] text-bright-gold">
              {BRAND.tagline}
            </p>
          </motion.div>
          <button
            type="button"
            onClick={skip}
            className="absolute bottom-10 right-6 text-sm text-off-white/70 hover:text-bright-gold"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
