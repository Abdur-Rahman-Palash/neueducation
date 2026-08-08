"use client";

import { useMemo, useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useAuthStore } from "@/store/authStore";
import { useCourseStore } from "@/store/courseStore";
import type { Course } from "@/types";

const blankCourse = (instructorId: string): Course => ({
  id: `course-${Date.now()}`,
  slug: "new-course",
  title: { bn: "নতুন কোর্স", en: "New Course", ar: "دورة جديدة" },
  description: { bn: "কোর্সের বিবরণ", en: "Course description", ar: "وصف الدورة" },
  learningOutcomes: ["Outcome 1"],
  price: 0,
  currency: "USD",
  isFree: true,
  isPublished: true,
  language: "en",
  category: "General",
  level: "beginner",
  thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
  instructorId,
  instructorName: "Instructor",
  rating: 5,
  studentCount: 0,
  lectures: [],
  createdAt: new Date().toISOString(),
});

export default function TeacherCoursesPage() {
  const { user } = useAuthStore();
  const courseState = useCourseStore((state) => state);
  const userId = user?.id ?? "";
  const courses = useMemo(() => courseState.courses.filter((course) => course.instructorId === userId), [courseState.courses, userId]);
  const addCourse = useCourseStore((state) => state.addCourse);
  const updateCourse = useCourseStore((state) => state.updateCourse);
  const deleteCourse = useCourseStore((state) => state.deleteCourse);
  const [draft, setDraft] = useState<Course | null>(null);
  const [title, setTitle] = useState("");

  const selectedCourse = useMemo(() => draft ?? null, [draft]);

  const startCreate = () => {
    if (!user) return;
    const newCourse = blankCourse(user.id);
    setDraft(newCourse);
    setTitle(newCourse.title.en);
  };

  const saveCourse = () => {
    if (!draft || !user) return;
    const current = { ...draft, title: { ...draft.title, en: title }, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-") };
    if (courses.some((course) => course.id === current.id)) {
      updateCourse(current);
    } else {
      addCourse(current);
    }
    setDraft(null);
  };

  return (
    <ProtectedRoute allowedRoles={["teacher", "admin"]}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Teacher workspace</p>
            <h1 className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">Manage your courses</h1>
          </div>
          <Button variant="primary" onClick={startCreate}>Create course</Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-4">
            {courses.map((course) => (
              <AnimatedSection key={course.id} delay={0.04}>
                <Card className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--color-ink)]">{course.title.en}</h2>
                    <p className="text-sm text-[var(--color-gray)]">{course.description.en}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => { setDraft(course); setTitle(course.title.en); }}>Edit</Button>
                    <Button variant="urgency" onClick={() => deleteCourse(course.id)}>Delete</Button>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          {selectedCourse ? (
            <AnimatedSection className="space-y-4">
              <Card className="space-y-4">
                <h2 className="text-2xl font-semibold text-[var(--color-ink)]">{selectedCourse.title.en}</h2>
                <Input label="Course title" value={title} onChange={(event) => setTitle(event.target.value)} />
                <Input label="Price" type="number" value={selectedCourse.price} onChange={(event) => setDraft({ ...selectedCourse, price: Number(event.target.value), isFree: Number(event.target.value) === 0 })} />
                <Input label="Category" value={selectedCourse.category} onChange={(event) => setDraft({ ...selectedCourse, category: event.target.value })} />
                <Input label="Slug" value={selectedCourse.slug} onChange={(event) => setDraft({ ...selectedCourse, slug: event.target.value })} />
                <Button variant="primary" className="w-full" onClick={saveCourse}>Save changes</Button>
              </Card>
            </AnimatedSection>
          ) : null}
        </div>
      </div>
    </ProtectedRoute>
  );
}
