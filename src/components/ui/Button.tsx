import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "urgency";
  href?: string;
  className?: string;
  onClick?: () => void;
}

export function Button({ children, variant = "primary", href, className = "", onClick }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]",
    secondary: "border border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:bg-[var(--color-surface)]",
    urgency: "bg-[var(--color-energy)] text-white hover:opacity-90",
  };
  const classes = `${base} ${variants[variant]} ${className}`.trim();
  const extraProps = variant === "primary" ? { "data-magnetic": "true" as const } : {};

  if (href) {
    return (
      <Link href={href} className={classes} {...extraProps}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} {...extraProps}>
      {children}
    </button>
  );
}
