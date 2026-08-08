"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { title: "Curious beginner", subtitle: "Never read Arabic before" },
  { title: "Building the habit", subtitle: "Daily 15-minute lessons" },
  { title: "Confident reader", subtitle: "Reading Qur'an with understanding" },
  { title: "Ijazah holder", subtitle: "Certified and teaching others" },
];

export function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<SVGPathElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!sectionRef.current || !lineRef.current) return;

    const section = sectionRef.current;
    const line = lineRef.current;
    const stageDots = section.querySelectorAll<HTMLElement>("[data-stage-dot]");
    const stageCards = section.querySelectorAll<HTMLElement>("[data-stage-copy]");
    const lineLength = line.getTotalLength();
    line.style.strokeDasharray = `${lineLength}`;
    line.style.strokeDashoffset = `${lineLength}`;

    const shouldPin = window.matchMedia("(min-width: 1024px)").matches;
    const pinDistance = shouldPin
      ? Math.max(180, Math.round(section.offsetHeight * 0.35))
      : 0;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: shouldPin ? `+=${pinDistance}` : "bottom top",
          scrub: shouldPin,
          pin: shouldPin,
          anticipatePin: shouldPin ? 1 : 0,
          pinSpacing: shouldPin,
        },
      });

      tl.to(line, { strokeDashoffset: 0, ease: "none" }, 0)
        .fromTo(
          stageDots,
          { scale: 0.6, opacity: 0.35 },
          { scale: 1, opacity: 1, stagger: 0.16, ease: "power2.out" },
          0.08,
        )
        .fromTo(
          stageCards,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.16, ease: "power2.out" },
          0.16,
        );
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="mx-auto py-16 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-[var(--color-ink)]">Your learning journey</h2>
        <p className="text-sm text-[var(--color-gray)]">A short, scannable path — pick the stage that fits you.</p>
      </div>
      <div className="relative w-full overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white/95 p-8 shadow-lg">
        <div className="hidden lg:block">
          <svg className="w-full h-8" viewBox="0 0 100 8" preserveAspectRatio="none">
            <path ref={lineRef} className="draw-path" d="M2 4 L98 4" stroke="var(--color-teal)" strokeWidth={0.6} fill="none" strokeLinecap="round" />
          </svg>
          <div className="mt-10 grid grid-cols-4 gap-4">
            {stages.map((stage, index) => (
              <div key={stage.title} className="space-y-4 text-center">
                <div data-stage-dot className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-teal)] font-semibold shadow-sm opacity-40 scale-90 transition-all">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-ink)]">{stage.title}</h3>
                <p data-stage-copy className="text-sm text-[var(--color-gray)] opacity-0">{stage.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:hidden space-y-4">
          {stages.map((stage, index) => (
            <div key={stage.title} className="flex items-start gap-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--color-teal)] font-semibold shadow-sm">{index + 1}</div>
              <div>
                <h3 className="font-semibold text-lg text-[var(--color-ink)]">{stage.title}</h3>
                <p className="text-sm text-[var(--color-gray)]">{stage.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/courses" variant="primary" className="px-6 py-3">
            Start your journey
          </Button>
        </div>
      </div>
    </section>
  );
}
