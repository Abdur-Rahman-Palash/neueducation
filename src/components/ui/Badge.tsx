import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return <span className={`inline-flex rounded-full bg-[var(--color-surface)] px-3 py-1 text-sm font-medium text-[var(--color-primary)] ${className}`.trim()}>{children}</span>;
}
