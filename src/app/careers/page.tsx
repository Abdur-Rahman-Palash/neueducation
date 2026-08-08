import { Button } from "@/components/ui/Button";

const openings = [
  { role: "Learning Experience Designer", description: "Build course pathways, assessments, and learning experiences for our language tracks." },
  { role: "Community Mentor", description: "Support learners with timely feedback, coaching, and encouragement during cohorts." },
  { role: "Operations Associate", description: "Help scale curriculum, onboarding, and student success across programs." },
];

export default function CareersPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="space-y-8 rounded-[2rem] border border-[var(--color-border)] bg-white/95 p-10 shadow-xl">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">Careers</p>
          <h1 className="text-4xl font-semibold text-[var(--color-ink)] sm:text-5xl">Join the team building modern language learning.</h1>
          <p className="max-w-3xl text-lg leading-8 text-[var(--color-gray)]">
            We’re hiring passionate people who care about experience, clarity, and measurable progress for every learner.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {openings.map((opening) => (
            <div key={opening.role} className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7">
              <h2 className="text-xl font-semibold text-[var(--color-ink)]">{opening.role}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--color-gray)]">{opening.description}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 rounded-[2rem] border border-[var(--color-border)] bg-white/95 p-8 text-sm text-[var(--color-gray)] sm:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">Why work with us?</p>
            <ul className="mt-4 space-y-3">
              <li>Flexible remote-first environment with meaningful collaboration.</li>
              <li>Professional growth, course access, and mentorship culture.</li>
              <li>Work on products that help learners feel confident and fluent.</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-[var(--color-background)] p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-gray)]">Apply now</p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-ink)]">Send your resume and a short note about what you’d love to build with us.</p>
            <Button href="/contact" variant="primary" className="mt-6 w-full">
              Contact recruiting
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
