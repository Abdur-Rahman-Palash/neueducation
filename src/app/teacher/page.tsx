"use client";

import { useMemo } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";
import { useCourseStore } from "@/store/courseStore";

export default function TeacherPage() {
  const { user } = useAuthStore();
  const courseState = useCourseStore((state) => state);
  const userId = user?.id ?? "";
  const courses = useMemo(() => courseState.courses.filter((course) => course.instructorId === userId), [courseState.courses, userId]);

  return (
    <ProtectedRoute allowedRoles={["teacher", "admin"]}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-[var(--color-ink)]">Teacher dashboard</h1>
            <p className="mt-2 text-[var(--color-gray)]">Create, edit, and remove your teaching content from one place.</p>
          </div>
          <Button href="/teacher/courses" variant="primary">
            Manage courses
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <Card key={course.id} className="space-y-3">
              <h2 className="text-xl font-semibold text-[var(--color-ink)]">{course.title.en}</h2>
              <p className="text-sm text-[var(--color-gray)]">{course.description.en}</p>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
