"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function StickyEnrollBar() {
  const prefersReducedMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
      setHidden(nearBottom);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed bottom-4 left-1/2 z-[60] w-[min(92vw,36rem)] -translate-x-1/2 items-center justify-between rounded-2xl bg-[#0B1739] px-4 py-3 text-white shadow-2xl shadow-[#0B1739]/30 sm:px-5 sm:py-4 md:w-[min(92vw,36rem)]"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={prefersReducedMotion ? { opacity: 1, y: 0 } : hidden ? { opacity: 0, y: 24, pointerEvents: "none" } : { opacity: 1, y: 0, pointerEvents: "auto" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <p className="text-xs font-semibold leading-tight sm:text-sm">There is still time — start today</p>
        <p className="text-[11px] leading-relaxed text-slate-300 sm:text-sm">Limited seats, live support, and a practical curriculum</p>
      </div>
      <a href="/signup" className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[#E4B343] px-4 py-2 text-xs font-semibold text-[#0B1739] transition hover:bg-[#f0c967] sm:mt-0 sm:w-auto sm:text-sm">
        Enroll Now
      </a>
    </motion.div>
  );
}
