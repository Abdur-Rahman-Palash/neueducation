"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function MotivationSection() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 25]);

  return (
    <section className="overflow-x-hidden bg-[#0B1739] py-20 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            One <span className="text-[#E4B343]">bold step</span> can open the whole road
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
            We do more than teach; we prepare you academically and spiritually so your future is shaped with purpose.
          </p>
          <a href="/signup" className="mt-8 inline-flex rounded-xl bg-[#E4B343] px-5 py-3 text-sm font-semibold text-[#0B1739] transition hover:bg-[#f0c967]">
            Begin Today
          </a>
        </div>

        <motion.div style={prefersReducedMotion ? undefined : { y }} className="flex justify-center">
          <div className="w-full max-w-md rounded-[2rem] border border-white/20 bg-white/10 p-4 backdrop-blur sm:p-6">
            <svg viewBox="0 0 320 260" className="w-full" role="img" aria-label="Motivation illustration">
              <rect x="26" y="28" width="268" height="204" rx="32" fill="#12297A" />
              <circle cx="168" cy="114" r="58" fill="#E4B343" />
              <path d="M146 180c16-24 45-31 73-18 11 5 18 11 25 20H146Z" fill="#DFF6E8" />
              <path d="M116 174c14-42 41-60 82-60" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
