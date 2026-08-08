import type { CSSProperties } from "react";

export function Skeleton({ className = "", style = {} }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 ${className}`}
      style={style}
      aria-hidden
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-6 w-32 rounded-full" />
      <Skeleton className="h-6 w-48 rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>
    </div>
  );
}
