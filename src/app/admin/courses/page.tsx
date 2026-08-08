"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useCourseStore } from "@/store/courseStore";
import type { Course } from "@/types";

export default function AdminCoursesPage() {
  const courses = useCourseStore((state) => state.courses);
  const addCourse = useCourseStore((state) => state.addCourse);
  const updateCourse = useCourseStore((state) => state.updateCourse);
  const deleteCourse = useCourseStore((state) => state.deleteCourse);
  const [draft, setDraft] = useState<Course | null>(null);

  const startCreate = () => {
    setDraft({
      id: `course-${Date.now()}`,
      slug: "new-course",
      title: { bn: "নতুন কোর্স", en: "New Course", ar: "دورة جديدة" },
      description: { bn: "কোর্সের বিবরণ", en: "Course description", ar: "وصف الدورة" },
      learningOutcomes: ["Outcome"],
      price: 0,
      currency: "USD",
      isFree: true,
      isPublished: true,
      language: "en",
      category: "General",
      level: "beginner",
      thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
      instructorId: "user-teacher",
      instructorName: "Rafiq Hassan",
      rating: 5,
      studentCount: 0,
      lectures: [],
      createdAt: new Date().toISOString(),
    });
  };

  const saveDraft = () => {
    if (!draft) return;
    if (courses.some((course) => course.id === draft.id)) {
      updateCourse(draft);
    } else {
      addCourse(draft);
    }
    setDraft(null);
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Admin controls</p>
            <h1 className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">Manage every course</h1>
          </div>
          <Button variant="primary" onClick={startCreate}>Create course</Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-4">
            {courses.map((course, index) => (
              <AnimatedSection key={course.id} delay={index * 0.04}>
                <Card className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--color-ink)]">{course.title.en}</h2>
                    <p className="text-sm text-[var(--color-gray)]">{course.description.en}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => setDraft(course)}>Edit</Button>
                    <Button variant="urgency" onClick={() => deleteCourse(course.id)}>Delete</Button>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          {draft ? (
            <AnimatedSection className="space-y-4">
              <Card className="space-y-4">
                <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Edit course</h2>
                <Input label="Title" value={draft.title.en} onChange={(event) => setDraft({ ...draft, title: { ...draft.title, en: event.target.value } })} />
                <Input label="Price" type="number" value={draft.price} onChange={(event) => setDraft({ ...draft, price: Number(event.target.value), isFree: Number(event.target.value) === 0 })} />
                <Input label="Category" value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} />
                <Input label="Slug" value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value })} />
                <Button variant="primary" className="w-full" onClick={saveDraft}>Save course</Button>
              </Card>
            </AnimatedSection>
          ) : null}
        </div>
      </div>
    </ProtectedRoute>
  );
}
