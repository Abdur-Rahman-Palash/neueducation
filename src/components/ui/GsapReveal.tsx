"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

export function GsapReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const el = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!el.current) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const nodes = el.current?.querySelectorAll<HTMLElement>(".gsap-item");
      if (!nodes || nodes.length === 0) return;
      gsap.from(nodes, {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        ease: "power3.out",
        duration: 0.6,
        delay,
        scrollTrigger: {
          trigger: el.current,
          start: "top 85%",
          end: "bottom 10%",
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={el} className={className}>
      {typeof children === "string" ? <div className="gsap-item">{children}</div> : children}
    </div>
  );
}
