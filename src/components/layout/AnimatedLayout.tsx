"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion && window.matchMedia("(pointer:fine)").matches) {
        const magneticElements = gsap.utils.toArray<HTMLElement>("[data-magnetic]");
        magneticElements.forEach((el) => {
          const moveX = gsap.quickTo(el, "x", { duration: 0.24, ease: "power1.out" });
          const moveY = gsap.quickTo(el, "y", { duration: 0.24, ease: "power1.out" });

          const handlePointerMove = (event: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            const offsetX = event.clientX - (rect.left + rect.width / 2);
            const offsetY = event.clientY - (rect.top + rect.height / 2);
            const max = 12;
            moveX(Math.max(Math.min(offsetX / 6, max), -max));
            moveY(Math.max(Math.min(offsetY / 6, max), -max));
          };

          const handlePointerLeave = () => {
            moveX(0);
            moveY(0);
          };

          el.addEventListener("pointermove", handlePointerMove);
          el.addEventListener("pointerleave", handlePointerLeave);
          el.addEventListener("pointercancel", handlePointerLeave);
        });

        const tiltElements = gsap.utils.toArray<HTMLElement>("[data-tilt]");
        tiltElements.forEach((el) => {
          const rotateX = gsap.quickTo(el, "rotationX", { duration: 0.35, ease: "power2.out" });
          const rotateY = gsap.quickTo(el, "rotationY", { duration: 0.35, ease: "power2.out" });

          const handlePointerMove = (event: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            const offsetX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
            const offsetY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
            const rotationY = Math.max(Math.min(offsetX * 8, 8), -8);
            const rotationX = Math.max(Math.min(offsetY * -8, 8), -8);
            el.style.setProperty("--pointer-x", `${50 + offsetX * 30}%`);
            el.style.setProperty("--pointer-y", `${50 + offsetY * 30}%`);
            rotateX(rotationX);
            rotateY(rotationY);
          };

          const handlePointerLeave = () => {
            rotateX(0);
            rotateY(0);
            el.style.setProperty("--pointer-x", "50%");
            el.style.setProperty("--pointer-y", "50%");
          };

          el.addEventListener("pointermove", handlePointerMove);
          el.addEventListener("pointerleave", handlePointerLeave);
          el.addEventListener("pointercancel", handlePointerLeave);
        });
      }

      if (!prefersReducedMotion) {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)", scale: 1.08, opacity: 0.86 },
            {
              clipPath: "inset(0 0 0 0)",
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 92%",
                end: "top 68%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      }
    }, document.body);

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, [pathname, prefersReducedMotion]);

  if (prefersReducedMotion) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false} key={pathname}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.22 }}
        style={{ minHeight: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
