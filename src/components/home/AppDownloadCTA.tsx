"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Smartphone } from "lucide-react";

export function AppDownloadCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="overflow-x-hidden bg-gradient-to-r from-[#12297A] to-[#0B1739] py-20 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Your learning journey, right on your <span className="text-[#E4B343]">mobile</span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300">
            Access your syllabus, notes, live classes, and progress in one simple app.
          </p>
          <a href="/signup" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#E4B343] px-5 py-3 text-sm font-semibold text-[#0B1739] transition hover:bg-[#f0c967]">
            Download Now
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { y: 0 }}
          animate={prefersReducedMotion ? { y: 0 } : { y: [0, -8, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center"
        >
          <div className="w-full max-w-sm rounded-[2rem] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] bg-[#0B1739] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">Neu App</div>
                <Smartphone className="h-6 w-6 text-[#E4B343]" />
              </div>
              <div className="rounded-2xl bg-white/10 p-5">
                <p className="text-sm text-slate-300">আজকের অগ্রগতি</p>
                <p className="mt-2 text-4xl font-extrabold text-white">৮৭%</p>
                <p className="mt-3 text-sm text-slate-300">সপ্তাহভিত্তিক আরও ৩টি লক্ষ্য বাকি</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
