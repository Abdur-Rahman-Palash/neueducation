"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { mockActivities } from "@/lib/mockActivity";
import { useReducedMotion } from "framer-motion";

export function LiveTicker() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;
    if (prefersReducedMotion) return; // do not animate

    const ctx = gsap.context(() => {
      const wrap = containerRef.current?.querySelector<HTMLDivElement>(".ticker-wrap");
      if (!wrap) return;
      const inner = wrap.querySelector<HTMLDivElement>(".ticker-inner");
      if (!inner) return;

      // Duplicate content for seamless loop
      const clone = inner.cloneNode(true) as HTMLDivElement;
      wrap.appendChild(clone);

      const totalWidth = inner.scrollWidth;
      const duration = Math.max(18, totalWidth / 80); // adaptive speed

      const anim = gsap.to(wrap, {
        x: `-=${totalWidth}`,
        ease: "none",
        duration,
        repeat: -1,
        modifiers: {
          x: (x) => `${parseFloat(x) % -totalWidth}`,
        },
      });

      const wrapEl = wrap;
      const onEnter = () => anim.resume();
      const onLeave = () => anim.pause();
      wrapEl.addEventListener("mouseenter", onLeave);
      wrapEl.addEventListener("mouseleave", onEnter);

      // Pause on touchstart for mobile
      wrapEl.addEventListener("touchstart", onLeave);
      wrapEl.addEventListener("touchend", onEnter);

      return () => {
        anim.kill();
        wrapEl.removeEventListener("mouseenter", onLeave);
        wrapEl.removeEventListener("mouseleave", onEnter);
        wrapEl.removeEventListener("touchstart", onLeave);
        wrapEl.removeEventListener("touchend", onEnter);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="overflow-hidden bg-white py-3" style={{ height: 72 }} ref={containerRef}>
      <div className="ticker-wrap will-change-transform flex items-center space-x-4 whitespace-nowrap" aria-hidden>
        <div className="ticker-inner flex items-center space-x-4">
          {mockActivities.map((act) => (
            <div key={act.id} className="flex items-center gap-3 rounded-md border border-[var(--color-teal)]/10 bg-[var(--color-surface)] px-3 py-2 text-sm">
              <div className="h-8 w-8 flex-none rounded-full bg-[var(--color-teal)]/10 text-[var(--color-teal)] flex items-center justify-center font-semibold">{act.name.split(" ")[0].slice(0,2)}</div>
              <div className="min-w-[220px]">
                <div className="font-medium text-[var(--color-ink)]">{act.name}</div>
                <div className="text-xs text-[var(--color-gray)]">{act.action} <span className="font-semibold text-[var(--color-primary)]">{act.course}</span> • {act.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
