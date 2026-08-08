"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import type { UserRole } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  fallbackPath?: string;
}

export function ProtectedRoute({ children, allowedRoles = ["student", "teacher", "admin"], fallbackPath = "/login" }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(fallbackPath);
    } else if (user && !allowedRoles.includes(user.role)) {
      router.replace("/");
    }
  }, [allowedRoles, fallbackPath, isAuthenticated, router, user]);

  if (!isAuthenticated || !user) {
    return <div className="px-4 py-20 text-center text-[var(--color-gray)]">Please sign in to access this area.</div>;
  }

  if (!allowedRoles.includes(user.role)) {
    return <div className="px-4 py-20 text-center text-[var(--color-gray)]">You do not have access to this page.</div>;
  }

  return <>{children}</>;
}
