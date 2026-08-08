"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { ArrowRight, BookOpen, GraduationCap, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useCourseStore } from "@/store/courseStore";
import { JourneyTimeline } from "@/components/landing/JourneyTimeline";
import gsap from "gsap";

const heroTitle = "Neu Education.";

function splitText(text: string) {
  return text.split("").map((char, index) => (
    <span key={`${char}-${index}`} className="inline-block">
      {char}
    </span>
  ));
}

export default function HomePage() {
  const courses = useCourseStore.getState().courses.slice(0, 3);
  const prefersReducedMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const statRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (headingRef.current) {
      const letters = headingRef.current.querySelectorAll<HTMLSpanElement>("span");
      gsap.fromTo(
        letters,
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 0.72, ease: "power3.out", stagger: 0.03 },
      );
    }

    if (statRef.current) {
      const final = "50k+";
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+";
      const tweenObj = { progress: 0 };
      gsap.to(tweenObj, {
        progress: 1,
        duration: 0.42,
        ease: "power1.out",
        onUpdate() {
          if (!statRef.current) return;
          const scramble = Array.from({ length: final.length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
          statRef.current.textContent = scramble;
        },
        onComplete() {
          if (statRef.current) statRef.current.textContent = final;
        },
        delay: 0.2,
      });
    }
  }, [prefersReducedMotion]);

  return (
    <div className="bg-transparent">
      <section className="relative overflow-hidden py-24 sm:py-28">
        <div className="hero-gradient-blob-1" />
        <div className="hero-gradient-blob-2" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="space-y-8">
            <Badge className="bg-[var(--color-primary)]/10 text-[var(--color-primary)]">Multilingual learning optimized for mastery</Badge>
            <div className="space-y-6">
              <h1 className="text-5xl font-semibold tracking-[-0.04em] text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
               Neu Education.
              </h1>
              <p className="max-w-2xl text-lg text-[var(--color-gray)] sm:text-xl">
                A high-end learning experience with polished visuals, live coaching, and career-ready pathways for serious learners.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="/courses" variant="primary" className="min-w-[160px]">
                Explore courses
              </Button>
              <Button href="/login" variant="secondary" className="min-w-[160px]">
                Join today
              </Button>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-white/95 p-4 text-sm text-[var(--color-gray)]">
              <div className="font-semibold text-[var(--color-ink)]">Price clarity for every learner</div>
              <div>Start with free previews, enroll only when you're ready, and keep lifetime access to all materials.</div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="bg-white/95 shadow-lg transition hover:-translate-y-1" data-reveal>
                <div className="flex items-center gap-2 text-sm text-[var(--color-teal)]">
                  <GraduationCap className="h-4 w-4" />
                  <span ref={statRef}>50k+ learners</span>
                </div>
                <p className="mt-4 text-lg font-semibold text-[var(--color-ink)]">Real students, real progress.</p>
              </Card>
              <Card className="bg-white/95 shadow-lg transition hover:-translate-y-1" data-reveal>
                <div className="flex items-center gap-2 text-sm text-[var(--color-gold)]">
                  <TrendingUp className="h-4 w-4" />
                  <span>200+ courses</span>
                </div>
                <p className="mt-4 text-lg font-semibold text-[var(--color-ink)]">Curated tracks for every skill level.</p>
              </Card>
              <Card className="bg-white/95 shadow-lg transition hover:-translate-y-1" data-reveal>
                <div className="flex items-center gap-2 text-sm text-[var(--color-energy)]">
                  <Sparkles className="h-4 w-4" />
                  <span>Live mentorship</span>
                </div>
                <p className="mt-4 text-lg font-semibold text-[var(--color-ink)]">Expert guidance for every step.</p>
              </Card>
            </div>
          </motion.div>

          <motion.div initial={prefersReducedMotion ? false : { opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
            <Card className="relative overflow-hidden bg-white/95 p-8 shadow-xl" data-tilt data-reveal>
              <div className="absolute -right-16 top-10 h-44 w-44 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
              <div className="absolute -left-16 bottom-8 h-40 w-40 rounded-full bg-[var(--color-teal)]/10 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-[var(--color-primary)]/10 px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
                    Live cohort starting soon
                  </div>
                  <span className="rounded-full bg-[var(--color-surface)] px-3 py-2 text-xs uppercase tracking-[0.18em] text-[var(--color-gray)]">
                    Premium design
                  </span>
                </div>
                <div className="rounded-2xl bg-[var(--color-background)] p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-gray)]">Featured course</p>
                      <h2 className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">Arabic Foundations</h2>
                    </div>
                    <div className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-sm font-semibold text-[var(--color-primary)]">
                      4.9 ★
                    </div>
                  </div>
                  <div className="mt-5 space-y-5">
                    <p className="text-sm leading-7 text-[var(--color-gray)]">A polished roadmap for fluent reading, writing, and speaking in Arabic, built for modern learners.</p>
                    <div className="rounded-full bg-white/90 p-3 text-sm font-semibold text-[var(--color-ink)] ring-1 ring-[var(--color-border)]">
                      12 lessons • Beginner friendly • Instant access
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-4">
                    <p className="text-sm font-semibold text-[var(--color-ink)]">Interactive practice</p>
                    <p className="mt-2 text-sm text-[var(--color-gray)]">Quizzes, audio drills, and speaking exercises.</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--color-border)] bg-white/90 p-4">
                    <p className="text-sm font-semibold text-[var(--color-ink)]">Expert mentorship</p>
                    <p className="mt-2 text-sm text-[var(--color-gray)]">Live guidance from certified instructors.</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                  <div className="flex items-center justify-between text-sm text-[var(--color-gray)]">
                    <span>Next cohort</span>
                    <span className="font-semibold text-[var(--color-ink)]">Sept 2</span>
                  </div>
                </div>
                <Button href="/courses/arabic-foundations" variant="urgency" className="w-full">
                  Secure your seat
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="cta-gradient-banner overflow-hidden rounded-[2rem] px-8 py-14 text-white shadow-2xl shadow-[rgba(21,94,239,0.18)]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Build momentum with guided learning</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Take the next step with higher confidence.</h2>
            <p className="mt-4 text-base text-white/90">Premium courses, live mentorship, and clear completion goals designed to keep you moving forward.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
              <Button href="/courses" variant="secondary" className="bg-white text-[var(--color-ink)] hover:bg-white/95">Browse courses</Button>
              <Button href="/login" variant="primary" className="bg-white/10 text-white hover:bg-white/20 hover:text-white">Get started</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Trending courses</p>
              <h2 className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">Choose your next step</h2>
            </div>
            <Link href="/courses" className="text-sm font-semibold text-[var(--color-primary)]">See all</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {courses.map((course, index) => (
              <motion.div key={course.id} initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }} whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: index * 0.06 }}>
              <Card className="transform transition duration-300 hover:-translate-y-1 bg-white/95 shadow-lg" data-tilt data-reveal>
                <div className="flex items-center justify-between">
                  <Badge>{course.language.toUpperCase()}</Badge>
                  <span className="text-sm font-semibold text-[var(--color-gold)]">★ {course.rating}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[var(--color-ink)]">{course.title.en}</h3>
                <p className="mt-3 text-sm text-[var(--color-gray)]">{course.description.en}</p>
                <div className="mt-6 flex items-center justify-between text-sm text-[var(--color-gray)]">
                  <span>{course.level}</span>
                  <span>{course.isFree ? "Free" : `$${course.price}`}</span>
                </div>
                <Button href={`/courses/${course.slug}`} variant="secondary" className="mt-6 w-full">
                  View course
                </Button>
              </Card>
            </motion.div>
            ))}
          </div>
        </div>
      </section>

      <JourneyTimeline />
    </div>
  );
}
