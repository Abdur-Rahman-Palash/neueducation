"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCountUp } from "@/lib/animations";

const stats = [
  { value: 1200, label: "Successful learners" },
  { value: 24, label: "Months of programs" },
  { value: 96, label: "Satisfaction rate" },
  { value: 18, label: "Expert teachers" },
];

function StatCard({ value, label }: { value: number; label: string }) {
  const prefersReducedMotion = useReducedMotion();
  const count = useCountUp(value, 1200);

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_20px_40px_-12px_rgba(20,71,230,0.12)]"
    >
      <div className="text-3xl font-extrabold text-[#1447E6]">{label.includes("rate") ? `${count}%` : count}</div>
      <p className="mt-2 text-sm text-slate-600">{label}</p>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  );
}
