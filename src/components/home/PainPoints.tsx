"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookOpenCheck, HeartHandshake, Sparkles } from "lucide-react";
import { fadeUp } from "@/lib/animations";

const cards = [
  {
    icon: BookOpenCheck,
    tint: "bg-[#DFF6E8]",
    title: "Want to grow in Quran and knowledge?",
    body: "Many learners watch videos but still lack practical follow-up. We fill that gap with structure and guidance.",
  },
  {
    icon: HeartHandshake,
    tint: "bg-[#FDE9DC]",
    title: "Studying alone and feeling stuck?",
    body: "Our live sessions and mentor support make learning more focused, personal, and meaningful.",
  },
  {
    icon: Sparkles,
    tint: "bg-[#EFE6FB]",
    title: "Want both faith and practical success?",
    body: "Our curriculum is designed to build knowledge, character, and real-life confidence together.",
  },
];

export function PainPoints() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
      <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
        <h2 className="text-center text-3xl font-extrabold text-[#0B1739] sm:text-4xl">
          Are you facing this too? <span className="text-[#1447E6]">Your path needs direction</span>
        </h2>
      </motion.div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-2xl border border-slate-200 p-6 shadow-[0_20px_40px_-12px_rgba(20,71,230,0.12)] ${card.tint}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 text-[#1447E6]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-extrabold text-[#0B1739]">{card.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{card.body}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
