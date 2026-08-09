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
      className="fixed bottom-4 left-1/2 z-[60] hidden w-[min(92vw,36rem)] -translate-x-1/2 items-center justify-between rounded-2xl bg-[#0B1739] px-5 py-4 text-white shadow-2xl shadow-[#0B1739]/30 md:flex"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={prefersReducedMotion ? { opacity: 1, y: 0 } : hidden ? { opacity: 0, y: 24, pointerEvents: "none" } : { opacity: 1, y: 0, pointerEvents: "auto" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div>
        <p className="text-sm font-semibold">There is still time — start today</p>
        <p className="text-sm text-slate-300">Limited seats, live support, and a practical curriculum</p>
      </div>
      <a href="/signup" className="rounded-xl bg-[#E4B343] px-4 py-2 text-sm font-semibold text-[#0B1739] transition hover:bg-[#f0c967]">
        Enroll Now
      </a>
    </motion.div>
  );
}
