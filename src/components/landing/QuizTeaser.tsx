"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import { useCourseStore } from "@/store/courseStore";

const goals = ["Read Qur'an fluently", "Learn Arabic grammar", "Understand Tafsir"];
const times = ["15 min", "30 min", "1 hour+"];

export function QuizTeaser() {
  const [step, setStep] = useState(1);
  const [choiceA, setChoiceA] = useState<string | null>(null);
  const [choiceB, setChoiceB] = useState<string | null>(null);
  const router = useRouter();
  const courses = useCourseStore.getState().courses;

  function recommend() {
    // Simple lookup: map (goal,time) to a course index
    const a = goals.indexOf(choiceA ?? goals[0]);
    const b = times.indexOf(choiceB ?? times[0]);
    const idx = (a + b) % Math.max(1, courses.length);
    return courses[idx];
  }

  const selectedCourse = (choiceA && choiceB) ? recommend() : null;

  return (
    <div className="mx-auto max-w-3xl">
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-ink)]">Not sure where to start?</h3>
            <p className="text-sm text-[var(--color-gray)]">Two quick choices and we’ll point you to the best first course.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--color-gray)]">
            <div className={`rounded-full px-2 py-1 ${step===1? 'bg-[var(--color-teal)] text-white':'bg-[var(--color-surface)]'}`}>1</div>
            <div className={`rounded-full px-2 py-1 ${step===2? 'bg-[var(--color-teal)] text-white':'bg-[var(--color-surface)]'}`}>2</div>
            <div className={`rounded-full px-2 py-1 ${step===3? 'bg-[var(--color-teal)] text-white':'bg-[var(--color-surface)]'}`}>3</div>
          </div>
        </div>

        <motion.div className="mt-4" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
          {step === 1 && (
            <div className="space-y-3">
              <div className="text-sm font-medium">What's your goal?</div>
              <div className="flex flex-wrap gap-3 mt-2">
                {goals.map((g) => (
                  <Button key={g} variant={choiceA === g ? "primary" : "secondary"} onClick={() => { setChoiceA(g); setStep(2); }}>{g}</Button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <div className="text-sm font-medium">Daily commitment</div>
              <div className="flex flex-wrap gap-3 mt-2">
                {times.map((t) => (
                  <Button key={t} variant={choiceB === t ? "primary" : "secondary"} onClick={() => { setChoiceB(t); }}>{t}</Button>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Button onClick={() => setStep(1)} variant="secondary">Back</Button>
                <Button onClick={() => setStep(3)} variant="primary">See recommendation</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              {selectedCourse ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="font-semibold text-[var(--color-ink)]">{selectedCourse.title.en}</div>
                    <div className="text-sm text-[var(--color-gray)]">{selectedCourse.description.en}</div>
                    <div className="mt-2 text-sm text-[var(--color-gray)]">{selectedCourse.lectures.length} lessons • {selectedCourse.level}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button href={`/courses/${selectedCourse.slug}`} variant="primary">View course</Button>
                    <Button onClick={() => { setChoiceA(null); setChoiceB(null); setStep(1); }} variant="secondary">Try again</Button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-[var(--color-gray)]">No recommendation available.</div>
              )}
            </div>
          )}
        </motion.div>
      </Card>
    </div>
  );
}
