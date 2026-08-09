"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
  { question: "How do I enroll?", answer: "You can register and complete the enrollment form following the steps shown on the page." },
  { question: "How often are the live classes?", answer: "We usually offer two to three live sessions per week, plus review sessions when needed." },
  { question: "Can I study on mobile?", answer: "Yes, the platform is designed to work smoothly on mobile, tablet, and desktop devices." },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-[#EAF0FF] py-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#0B1739] sm:text-4xl">
            Frequently asked <span className="text-[#1447E6]">questions</span>
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <motion.div key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <button onClick={() => setOpen(isOpen ? -1 : index)} className="flex w-full items-center justify-between text-left">
                  <span className="text-lg font-semibold text-[#0B1739]">{faq.question}</span>
                  <motion.span animate={{ rotate: isOpen ? 135 : 0 }} transition={{ type: "spring", stiffness: 220, damping: 18 }} className="rounded-full bg-[#EAF0FF] p-2 text-[#1447E6]">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
