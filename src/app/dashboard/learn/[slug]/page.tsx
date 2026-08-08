"use client";

import { useEffect, useMemo, useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Toast } from "@/components/ui/Toast";
import { useAuthStore } from "@/store/authStore";
import { useCourseStore } from "@/store/courseStore";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function LearnPage() {
  const params = useParams<{ slug: string }>();
  const course = useCourseStore((state) => state.courses.find((item) => item.slug === params.slug));
  const user = useAuthStore((state) => state.user);
  const updateProgress = useCourseStore((state) => state.updateProgress);
  const enrollment = useCourseStore((state) => state.enrollments.find((item) => item.courseId === course?.id && item.userId === user?.id));
  const [progress, setProgress] = useState(enrollment?.progressPercent ?? 24);
  const [toast, setToast] = useState<string | null>(null);

  const milestone = useMemo(() => Math.min(100, Math.ceil((progress + 10) / 10) * 10), [progress]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!course) return <div className="px-4 py-20 text-center text-[var(--color-gray)]">Course not found.</div>;

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-[var(--color-ink)]">{course.title.en}</h1>
                <p className="mt-2 text-sm text-[var(--color-gray)]">{course.lectures.length} lectures – keep momentum with every session.</p>
              </div>
              <ProgressRing progress={progress} />
            </div>
            <ul className="space-y-2 text-sm text-[var(--color-gray)]">
              {course.lectures.map((lecture) => (
                <li key={lecture.id} className="rounded-2xl border border-[var(--color-border)] p-3">{lecture.title}</li>
              ))}
            </ul>
          </Card>
          <Card className="space-y-4">
            <h2 className="text-xl font-semibold text-[var(--color-ink)]">Lecture player</h2>
            <div className="overflow-hidden rounded-3xl border border-[var(--color-border)]">
              <iframe src={course.lectures[0]?.videoUrl ?? "https://www.youtube.com/embed/dQw4w9WgXcQ"} className="h-72 w-full" title={course.title.en} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-[var(--color-gray)]">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <input type="range" min="0" max="100" value={progress} onChange={(event) => {
                const value = Number(event.target.value);
                const delta = value - progress;
                setProgress(value);
                updateProgress(course.id, value);
                if (delta > 0) {
                  setToast(
                    value >= 100
                      ? "🎉 Course complete! Your certificate is ready."
                      : `Nice work — ${delta}% closer to completion!`,
                  );
                }
              }} className="w-full" />
            </div>
            <div className="rounded-2xl bg-[var(--color-surface)] p-4 text-sm text-[var(--color-ink)]">
              {progress >= 100
                ? "You finished this course. Share your achievement or start a new track."
                : `Next milestone: reach ${milestone}% to earn a completion badge.`}
            </div>
            <Button variant="primary" className="w-full">Continue learning</Button>
          </Card>
          {toast ? <Toast message={toast} /> : null}
        </div>
      </div>
    </ProtectedRoute>
  );
}
