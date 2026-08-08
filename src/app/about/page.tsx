import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="space-y-8 rounded-[2rem] border border-[var(--color-border)] bg-white/95 p-10 shadow-xl">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">About Neu Education</p>
          <h1 className="text-4xl font-semibold text-[var(--color-ink)] sm:text-5xl">We make modern learning more human, clear, and confident.</h1>
          <p className="max-w-3xl text-lg leading-8 text-[var(--color-gray)]">
            Neu Education was built for learners who want polished course design, live coaching, and simple progress tracking across Arabic, English, and Bangla.
            Our mission is to help every student move from curiosity to mastery with training that feels both motivating and deeply practical.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
            <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Thoughtfully designed curriculum</h2>
            <p className="mt-4 text-sm text-[var(--color-gray)]">Each learning path is structured around real skills, with guided practice, feedback loops, and meaningful milestones.</p>
          </div>
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
            <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Live support from expert mentors</h2>
            <p className="mt-4 text-sm text-[var(--color-gray)]">Our instructors are available to answer questions, review work, and help learners stay on track through every stage.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Vision</p>
            <p className="mt-3 text-sm text-[var(--color-gray)]">Create a premium learning home where language skills and confidence grow together.</p>
          </div>
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Approach</p>
            <p className="mt-3 text-sm text-[var(--color-gray)]">Blend interactive lessons, cohort momentum, and practical projects for everyday progress.</p>
          </div>
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Impact</p>
            <p className="mt-3 text-sm text-[var(--color-gray)]">Empower learners with real communication skills and confidence in more than one language.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--color-ink)]">Ready to explore programs?</p>
            <p className="text-sm text-[var(--color-gray)]">See the courses that fit your learning goals.</p>
          </div>
          <Button href="/courses" variant="primary" className="min-w-[180px]">
            Browse courses
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-[var(--color-gray)]">
          <Link href="/contact" className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-teal)]">Contact our team</Link>
          <Link href="/careers" className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-teal)]">See career opportunities</Link>
        </div>
      </div>
    </main>
  );
}
