"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useCourseStore } from "@/store/courseStore";
import { useBlogStore } from "@/store/blogStore";
import { useLiveStore } from "@/store/liveStore";

export default function AdminPage() {
  const courses = useCourseStore((state) => state.courses);
  const posts = useBlogStore((state) => state.posts);
  const sessions = useLiveStore((state) => state.sessions);

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-[var(--color-ink)]">Admin overview</h1>
            <p className="mt-2 text-[var(--color-gray)]">Coordinate courses, blog content, live sessions, and students from one console.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/admin/courses" variant="secondary">Courses</Button>
            <Button href="/admin/blog" variant="secondary">Blog</Button>
            <Button href="/admin/students" variant="secondary">Students</Button>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Courses</p>
            <p className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">{courses.length}</p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Blog posts</p>
            <p className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">{posts.length}</p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Live sessions</p>
            <p className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">{sessions.length}</p>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
