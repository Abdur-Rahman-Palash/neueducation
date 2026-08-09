"use client";

import { motion, useReducedMotion } from "framer-motion";

const testimonials = [
  {
    quote: "The learning method is very clear, and the teachers are genuinely supportive.",
    name: "Rayhan Ahmed",
    batch: "2025 batch",
  },
  {
    quote: "I learned madrasa-style study alongside modern methods in a balanced way.",
    name: "Munayera Khatun",
    batch: "2024 batch",
  },
  {
    quote: "Here I found a strong balance between faith, knowledge, and practical life.",
    name: "Mahmudul Hasan",
    batch: "2026 batch",
  },
];

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-[#0B1739] sm:text-4xl">
          Student <span className="text-[#1447E6]">feedback</span>
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.article
            key={item.name}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_40px_-12px_rgba(20,71,230,0.12)] sm:p-6"
          >
            <div className="text-[#E4B343]">★★★★★</div>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">“{item.quote}”</p>
            <div className="mt-6">
              <p className="font-extrabold text-[#0B1739]">{item.name}</p>
              <p className="text-sm text-slate-500">{item.batch}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
