"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Minus, Plus } from "lucide-react";

const levels = [
  {
    id: "level1",
    label: "Level 1",
    items: [
      { title: "Foundation", body: "Quran, Arabic basics, and daily practice" },
      { title: "Intro to Hadith", body: "A clear foundation in core hadith" },
    ],
  },
  {
    id: "level2",
    label: "Level 2",
    items: [
      { title: "Fiqh", body: "Practical fiqh for everyday life" },
      { title: "Tafsir", body: "Surah-based explanation and reflection" },
    ],
  },
  {
    id: "level3",
    label: "Level 3",
    items: [
      { title: "Advanced Study", body: "Deeper madrasa-style learning" },
      { title: "Projects", body: "Applied research and presentation" },
    ],
  },
];

export function CurriculumTabs() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(levels[0].id);
  const [open, setOpen] = useState<string | null>(levels[0].items[0].title);

  const activeLevel = levels.find((level) => level.id === active) ?? levels[0];

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-[#0B1739] sm:text-4xl">
          Choose your <span className="text-[#1447E6]">curriculum</span> path
        </h2>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => {
              setActive(level.id);
              setOpen(level.items[0].title);
            }}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active === level.id ? "bg-[#1447E6] text-white" : "border border-slate-300 bg-white text-slate-600"}`}
          >
            {level.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {activeLevel.items.map((item) => {
              const isOpen = open === item.title;
              return (
                <motion.div key={item.title} layout className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <button onClick={() => setOpen(isOpen ? null : item.title)} className="flex w-full items-center justify-between text-left">
                    <div>
                      <p className="text-lg font-semibold text-[#0B1739]">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.body}</p>
                    </div>
                    <motion.span animate={{ rotate: isOpen ? 135 : 0 }} transition={{ type: "spring", stiffness: 220, damping: 18 }} className="rounded-full bg-[#EAF0FF] p-2 text-[#1447E6]">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                        <div className="mt-4 rounded-xl bg-[#F8FAFF] p-4 text-sm leading-relaxed text-slate-600">
                          Deeper practice, live quizzes, and weekly assignments make complex topics easier to understand and apply.
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
