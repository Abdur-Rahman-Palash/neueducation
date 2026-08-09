"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <p className="font-semibold text-[var(--color-ink)]">Neu Education</p>
            <p className="mt-2 max-w-md text-sm text-[var(--color-gray)]">A modern learning platform for Arabic, English, and Bangla learners. Real teachers, real progress.</p>
            <div className="mt-4 text-sm text-[var(--color-gray)]">© {new Date().getFullYear()} Neu Education</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-[var(--color-ink)] text-sm">Explore</p>
              <ul className="mt-2 text-sm text-[var(--color-gray)]">
                <li><Link href="/courses">Courses</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/live">Live</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[var(--color-ink)] text-sm">Company</p>
              <ul className="mt-2 text-sm text-[var(--color-gray)]">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div>
            <p className="font-semibold text-[var(--color-ink)] text-sm">Stay updated</p>
            <p className="mt-2 text-sm text-[var(--color-gray)]">Get occasional emails about new courses and free resources.</p>
            <form className="mt-3 flex max-w-sm flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <input aria-label="Email" placeholder="you@example.com" className="flex-1 rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" />
              <Button variant="primary" className="px-4 py-2">Sign up</Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
