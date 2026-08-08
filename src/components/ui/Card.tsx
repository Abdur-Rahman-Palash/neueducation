import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return <div className={`rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm ${className}`.trim()}>{children}</div>;
}
