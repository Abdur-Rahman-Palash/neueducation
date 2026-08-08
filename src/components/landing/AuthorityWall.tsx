"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const instructors = [
  { name: "Dr. Ahmad", cred: "Graduate, Al-Azhar University" },
  { name: "Ust. Karim", cred: "15 years teaching experience" },
  { name: "Prof. Noor", cred: "Researcher, Classical Tafsir" },
];

export function AuthorityWall() {
  const numsRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!numsRef.current) return;
    if (prefersReducedMotion) return;

    const els = numsRef.current.querySelectorAll<HTMLElement>('[data-target]');
    const ctx = gsap.context(() => {
      els.forEach((el) => {
        const target = parseInt(el.dataset.target || "0", 10);
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: target,
          duration: 1.4,
          ease: 'power1.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          onUpdate: function() {
            el.textContent = Math.round((this as any).targets()[0].innerText).toLocaleString();
          }
        });
      });
    }, numsRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section className="mx-auto py-16 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-[var(--color-ink)] draw-heading">
            Meet our instructors
            <svg className="mt-3 h-3 w-full overflow-visible" viewBox="0 0 140 12" preserveAspectRatio="none">
              <path d="M2 6 L138 6" stroke="var(--color-primary)" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </h2>
          <p className="text-sm text-[var(--color-gray)]">Experienced teachers with verified credentials and warm mentorship.</p>
        </div>
        <div className="hidden sm:block text-sm text-[var(--color-gray)]">Trusted lineage • Real outcomes</div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3">
          {instructors.map((ins) => (
            <Card key={ins.name} className="flex items-center gap-3 p-4">
              <div className="h-14 w-14 flex-none rounded-full bg-[var(--color-ink)]/5 flex items-center justify-center font-semibold text-[var(--color-ink)]">{ins.name.split(' ')[0].slice(0,2)}</div>
              <div>
                <div className="font-semibold">{ins.name} <Badge className="ml-2">Verified</Badge></div>
                <div className="text-sm text-[var(--color-gray)]">{ins.cred}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-start justify-center">
          <h3 className="text-xl font-semibold text-[var(--color-ink)]">Our impact</h3>
          <div ref={numsRef} className="mt-4 grid w-full grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-semibold text-[var(--color-ink)]" data-target="10000">0</div>
              <div className="text-sm text-[var(--color-gray)]">students</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-[var(--color-ink)]" data-target="50">0</div>
              <div className="text-sm text-[var(--color-gray)]">courses</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-[var(--color-ink)]" data-target="98">0</div>
              <div className="text-sm text-[var(--color-gray)]">% completion</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-[var(--color-ink)]" data-target="48">0</div>
              <div className="text-sm text-[var(--color-gray)]">avg rating / 5</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[var(--color-ink)]">Lineage</h3>
          <div className="mt-6 flex items-center justify-center">
            <svg viewBox="0 0 220 64" className="w-full max-w-xs">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--color-teal)" />
                  <stop offset="100%" stopColor="var(--color-primary)" />
                </linearGradient>
              </defs>
              <g stroke="url(#g)" strokeWidth="2" fill="none" strokeLinecap="round">
                <circle cx="20" cy="32" r="12" fill="var(--color-surface)" strokeWidth="0" />
                <circle cx="110" cy="32" r="12" fill="var(--color-surface)" strokeWidth="0" />
                <circle cx="200" cy="32" r="12" fill="var(--color-surface)" strokeWidth="0" />
                <path className="draw-path" d="M32 32 L98 32" />
                <path className="draw-path" d="M122 32 L188 32" />
              </g>
              <text x="20" y="36" textAnchor="middle" className="text-xs fill-[var(--color-ink)]">Instructor</text>
              <text x="110" y="36" textAnchor="middle" className="text-xs fill-[var(--color-ink)]">Course</text>
              <text x="200" y="36" textAnchor="middle" className="text-xs fill-[var(--color-ink)]">Certificate</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
