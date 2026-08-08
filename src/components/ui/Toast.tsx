import type { ReactNode } from "react";

interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-3xl border border-[var(--color-border)] bg-white px-5 py-4 text-sm shadow-xl">
      <p className="font-semibold text-[var(--color-ink)]">{message}</p>
    </div>
  );
}
