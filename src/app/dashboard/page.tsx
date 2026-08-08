"use client";

import { useMemo } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { useAuthStore } from "@/store/authStore";
import { useCourseStore } from "@/store/courseStore";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const courseState = useCourseStore((state) => state);
  const userId = user?.id ?? "";
  const enrollments = useMemo(() => courseState.enrollments.filter((item) => item.userId === userId), [courseState.enrollments, userId]);
  const courses = courseState.courses;
  const activeEnrollment = useMemo(() => {
    return enrollments
      .filter((item) => item.progressPercent > 0 && item.progressPercent < 100)
      .sort((a, b) => new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime())[0];
  }, [enrollments]);
  const activeCourse = activeEnrollment ? courses.find((item) => item.id === activeEnrollment.courseId) : undefined;

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-[var(--color-ink)]">Your learning dashboard</h1>
        {activeCourse ? (
          <div className="mb-6">
            <Card className="flex flex-col gap-4 rounded-3xl border border-[var(--color-primary)] bg-[var(--color-primary)]/5 p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Resume learning</p>
                  <h2 className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">Continue {activeCourse.title.en}</h2>
                  <p className="mt-2 max-w-2xl text-sm text-[var(--color-gray)]">You left off at {activeEnrollment.progressPercent}%. Keep your momentum going with one quick click.</p>
                </div>
                <ProgressRing progress={activeEnrollment.progressPercent} />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href={`/dashboard/learn/${activeCourse.slug}`} variant="primary">Resume course</Button>
                <Button href="/courses" variant="secondary">Browse new courses</Button>
              </div>
            </Card>
          </div>
        ) : null}

        {enrollments.length === 0 ? (
          <div className="mb-6">
            <Card className="space-y-4 p-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Welcome back</p>
              <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Jump into your first course</h2>
              <p className="text-sm text-[var(--color-gray)]">Find curated lessons, preview content risk-free, and start building a learning streak today.</p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button href="/courses" variant="primary">Browse courses</Button>
                <Button href="/account" variant="secondary">View account</Button>
              </div>
            </Card>
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {enrollments.map((enrollment) => {
            const course = courses.find((item) => item.id === enrollment.courseId);
            if (!course) return null;
            const milestone = Math.min(100, Math.ceil((enrollment.progressPercent + 10) / 10) * 10);
            return (
              <div key={enrollment.id} className="gsap-item">
                <Card className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Enrolled</p>
                      <h2 className="mt-2 text-xl font-semibold text-[var(--color-ink)]">{course.title.en}</h2>
                    </div>
                    <ProgressRing progress={enrollment.progressPercent} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-[var(--color-gray)]">
                      <span>Course completion</span>
                      <span>{enrollment.progressPercent}%</span>
                    </div>
                    <div className="rounded-2xl bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)]">
                      {enrollment.progressPercent >= 100
                        ? "Certificate ready — keep the streak going!"
                        : `Next milestone: reach ${milestone}% to unlock a progress badge.`}
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </ProtectedRoute>
  );
}
