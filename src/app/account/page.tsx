"use client";

import { useMemo } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuthStore } from "@/store/authStore";

export default function AccountPage() {
  const { user, logout } = useAuthStore();
  const joinedAt = useMemo(() => new Date().toLocaleDateString(), []);

  return (
    <ProtectedRoute allowedRoles={["student", "teacher", "admin"]}>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Account details</p>
          <h1 className="text-3xl font-semibold text-[var(--color-ink)]">Hello, {user?.name ?? "Learner"}</h1>
          <p className="text-sm text-[var(--color-gray)]">Manage your profile, review your role, and return to your learning dashboard.</p>
        </div>

        <Card className="space-y-6 p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-[var(--color-surface)] p-5">
              <p className="text-sm font-medium text-[var(--color-gray)]">Name</p>
              <p className="mt-2 text-lg font-semibold text-[var(--color-ink)]">{user?.name}</p>
            </div>
            <div className="rounded-3xl bg-[var(--color-surface)] p-5">
              <p className="text-sm font-medium text-[var(--color-gray)]">Email</p>
              <p className="mt-2 text-lg font-semibold text-[var(--color-ink)]">{user?.email}</p>
            </div>
            <div className="rounded-3xl bg-[var(--color-surface)] p-5">
              <p className="text-sm font-medium text-[var(--color-gray)]">Role</p>
              <p className="mt-2 text-lg font-semibold text-[var(--color-ink)]">{user?.role}</p>
            </div>
            <div className="rounded-3xl bg-[var(--color-surface)] p-5">
              <p className="text-sm font-medium text-[var(--color-gray)]">Member since</p>
              <p className="mt-2 text-lg font-semibold text-[var(--color-ink)]">{joinedAt}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button href="/dashboard" variant="primary">Back to dashboard</Button>
            <button type="button" onClick={logout} className="rounded-full border border-[var(--color-border)] px-5 py-3 text-sm font-semibold text-[var(--color-gray)] transition hover:text-[var(--color-primary)]">
              Log out
            </button>
          </div>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
