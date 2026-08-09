import { useEffect, useState } from "react";
import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export function useCountUp(end: number, duration = 1200, start = 0) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    let frame = 0;
    let startTime: number | null = null;

    const onFrame = (time: number) => {
      if (startTime === null) {
        startTime = time;
      }
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (end - start) * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(onFrame);
      }
    };

    frame = window.requestAnimationFrame(onFrame);

    return () => window.cancelAnimationFrame(frame);
  }, [duration, end, start]);

  return value;
}
