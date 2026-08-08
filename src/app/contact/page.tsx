"use client";

import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 rounded-[2rem] border border-[var(--color-border)] bg-white/95 p-10 shadow-xl lg:grid-cols-[0.9fr_0.95fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">Contact</p>
            <h1 className="text-4xl font-semibold text-[var(--color-ink)] sm:text-5xl">Ask a question, request support, or explore partnerships.</h1>
            <p className="max-w-3xl text-lg leading-8 text-[var(--color-gray)]">
              We’re here to help learners, instructors, and partners move forward. Drop us a message and we’ll respond as soon as possible.
            </p>
          </div>

          <div className="grid gap-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">Email</p>
              <p className="mt-2 text-sm text-[var(--color-gray)]">hello@neueducation.com</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">Location</p>
              <p className="mt-2 text-sm text-[var(--color-gray)]">Remote-first with support across multiple time zones.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">Partnerships</p>
              <p className="mt-2 text-sm text-[var(--color-gray)]">Reach out for cohort and enterprise learning collaborations.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-background)] p-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Send us a message</p>
            <p className="text-sm text-[var(--color-gray)]">Use this form to share your question, feedback, or interest in working together.</p>
          </div>

          <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
            <label className="block text-sm font-semibold text-[var(--color-ink)]">
              Your name
              <input className="mt-2 w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" placeholder="Jane Doe" />
            </label>
            <label className="block text-sm font-semibold text-[var(--color-ink)]">
              Email address
              <input className="mt-2 w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" placeholder="you@example.com" />
            </label>
            <label className="block text-sm font-semibold text-[var(--color-ink)]">
              Message
              <textarea rows={5} className="mt-2 w-full rounded-3xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" placeholder="Tell us how we can help." />
            </label>
            <Button type="submit" variant="primary" className="w-full py-3">
              Send message
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
