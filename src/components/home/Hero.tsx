"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, CalendarDays, PlayCircle } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#EAF0FF] py-20 sm:py-24 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,71,230,0.08),_transparent_45%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate="visible"
          variants={staggerContainer}
          className="relative z-10"
        >
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d7e4ff] bg-white/90 px-4 py-2 text-sm font-semibold text-[#1447E6] shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E4B343]" />
            Inspired by the Deoband tradition of learning
          </motion.div>

          <motion.h1 variants={fadeUp} className="max-w-3xl text-4xl font-extrabold leading-tight text-[#0B1739] sm:text-5xl lg:text-6xl">
            Build your foundation, <span className="text-[#1447E6]">thrive in faith and life</span>.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
            Classical learning and modern practice, brought together in one clear learning experience. Study Quran, Hadith, Fiqh, and practical subjects with guided support.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a href="/courses" className="inline-flex items-center gap-2 rounded-xl border border-[#1447E6] px-5 py-3 text-sm font-semibold text-[#1447E6] transition hover:bg-white">
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/signup" className="inline-flex items-center gap-2 rounded-xl bg-[#1447E6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12297A]">
              Enroll Now
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_40px_-12px_rgba(20,71,230,0.12)]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF0FF] px-3 py-1.5 text-sm font-semibold text-[#12297A]">
                <CalendarDays className="h-4 w-4" />
                January 2026 batch
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF0FF] px-3 py-1.5 text-sm font-semibold text-[#12297A]">
                <BookOpen className="h-4 w-4" />
                Live classes + recordings
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl border border-[#1447E6] px-4 py-2.5 text-sm font-semibold text-[#1447E6]">
                <PlayCircle className="h-4 w-4" />
                Watch Preview
              </button>
              <a href="/signup" className="inline-flex items-center gap-2 rounded-xl bg-[#E4B343] px-4 py-2.5 text-sm font-semibold text-[#0B1739]">
                Join Today
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-4 shadow-[0_20px_40px_-12px_rgba(20,71,230,0.12)] sm:p-6 lg:p-8">
            <svg viewBox="0 0 420 360" className="w-full" role="img" aria-label="Neu Education illustration">
              <rect x="40" y="40" width="340" height="280" rx="28" fill="#EAF0FF" />
              <rect x="74" y="82" width="120" height="140" rx="24" fill="#1447E6" />
              <rect x="216" y="94" width="116" height="112" rx="24" fill="#E4B343" />
              <circle cx="268" cy="176" r="54" fill="#0B1739" />
              <path d="M168 244c24-42 68-56 112-28 22 14 34 28 44 54H168Z" fill="#DFF6E8" />
              <path d="M116 200c10-38 35-58 72-58 28 0 51 16 67 42" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" fill="none" />
              <path d="M126 188c26-30 61-41 98-35" stroke="#E4B343" strokeWidth="10" strokeLinecap="round" fill="none" />
              <circle cx="130" cy="136" r="18" fill="#FFFFFF" />
              <circle cx="270" cy="140" r="15" fill="#FFFFFF" />
              <path d="M92 306h236" stroke="#0B1739" strokeWidth="10" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
