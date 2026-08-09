"use client";

import { motion, useReducedMotion } from "framer-motion";

const leaders = [
  { name: "Abdullah Hossain", rating: "4.9/5 • 12 sessions" },
  { name: "Salma Rahman", rating: "4.8/5 • 10 projects" },
  { name: "Imran Ali", rating: "4.9/5 • 14 reviews" },
  { name: "Faiza Noor", rating: "4.7/5 • 9 outreach tasks" },
];

export function Leaderboard() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-[#0B1739] sm:text-4xl">
          <span className="text-[#1447E6]">Top learners</span> and their stories
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {leaders.map((leader, index) => (
          <motion.article
            key={leader.name}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-[0_20px_40px_-12px_rgba(20,71,230,0.12)] sm:p-6"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF0FF] ring-4 ring-[#EAF0FF] text-2xl font-black text-[#1447E6]">
              {leader.name.charAt(0)}
            </div>
            <h3 className="mt-5 text-lg font-extrabold text-[#0B1739]">{leader.name}</h3>
            <p className="mt-2 text-sm text-slate-600">⭐ {leader.rating}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
