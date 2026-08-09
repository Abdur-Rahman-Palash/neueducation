"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  { title: "First Step", body: "Start with the basics and core language" },
  { title: "Second Step", body: "Weekly practice and live review" },
  { title: "Third Step", body: "Advanced skills and lasting confidence" },
];

export function Roadmap() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-4xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-[#0B1739] sm:text-4xl">
          Your journey in <span className="text-[#1447E6]">three steps</span>
        </h2>
      </div>

      <div className="relative mt-12 space-y-6">
        <div className="absolute left-6 top-0 h-full w-px border-l border-dashed border-slate-300" />
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex gap-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1447E6] text-lg font-black text-white shadow-lg">
              {index + 1}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_40px_-12px_rgba(20,71,230,0.12)]">
              <h3 className="text-lg font-extrabold text-[#0B1739]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
