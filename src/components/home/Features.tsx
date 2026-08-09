"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BrainCircuit, Compass, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Smart Learning",
    body: "Weekly goals, reviews, and practice help learners stay consistent and confident.",
    icon: BrainCircuit,
    tint: "bg-[#DFF6E8]",
  },
  {
    title: "Personal Guidance",
    body: "Teacher feedback and timely follow-up keep each learner moving forward.",
    icon: Compass,
    tint: "bg-[#FDE9DC]",
  },
  {
    title: "A Trustworthy Environment",
    body: "A safe, calm, and encouraging learning atmosphere helps students focus with confidence.",
    icon: ShieldCheck,
    tint: "bg-[#EFE6FB]",
  },
];

export function Features() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-[#EAF0FF] py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#0B1739] sm:text-4xl">
            Why <span className="text-[#1447E6]">Neu Education</span> stands out
          </h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={prefersReducedMotion ? undefined : { y: -6, boxShadow: "0 24px 44px -14px rgba(20,71,230,0.16)" }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_40px_-12px_rgba(20,71,230,0.12)]"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.tint} text-[#1447E6]`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-[#0B1739]">{feature.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{feature.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
