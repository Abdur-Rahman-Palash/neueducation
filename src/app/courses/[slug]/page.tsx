"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { BookOpen, Lock, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/store/authStore";
import { useCourseStore } from "@/store/courseStore";
import { GsapReveal } from "@/components/ui/GsapReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function CourseDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { user } = useAuthStore();
  const courseState = useCourseStore((state) => state);
  const course = courseState.courses.find((item) => item.slug === slug);
  const enrollCourse = courseState.enrollCourse;
  const userId = user?.id ?? "";
  const enrolledIds = useMemo(() => courseState.getEnrolledCourseIds(userId), [courseState.enrollments, userId]);
  const enrollment = useMemo(
    () => course && courseState.enrollments.find((item) => item.courseId === course.id && item.userId === userId),
    [courseState.enrollments, course, userId],
  );
  const [activeLecture, setActiveLecture] = useState<string | null>(null);
  const [justEnrolled, setJustEnrolled] = useState(false);

  const isEnrolled = useMemo(() => !!course && enrolledIds.includes(course.id), [course, enrolledIds]);

  if (!course) return <div className="px-4 py-20 text-center text-[var(--color-gray)]">Course not found.</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Badge>{course.category}</Badge>
          <h1 className="text-4xl font-semibold text-[var(--color-ink)]">{course.title.en}</h1>
          <p className="text-lg text-[var(--color-gray)]">{course.description.en}</p>
          <div className="flex flex-wrap gap-3 text-sm text-[var(--color-gray)]">
            <span className="rounded-full bg-[var(--color-surface)] px-3 py-2">{course.studentCount}+ students</span>
            <span className="rounded-full bg-[var(--color-surface)] px-3 py-2">★ {course.rating} average rating</span>
            <span className="rounded-full bg-[var(--color-surface)] px-3 py-2">Lifetime access</span>
          </div>
          <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-ink)]">
            Preview the first module risk free before you commit.
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-primary)]">{course.level}</span>
            <span className="rounded-full bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)]">{course.language.toUpperCase()}</span>
            <span className="rounded-full bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)]">{course.studentCount}+ students</span>
          </div>
          {enrollment && enrollment.progressPercent > 0 && enrollment.progressPercent < 100 ? (
            <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-ink)]">
              <p className="font-semibold text-[var(--color-ink)]">Resume where you left off</p>
              <p className="mt-1 text-[var(--color-gray)]">You’re {enrollment.progressPercent}% through this course. Keep your streak going with the next lesson.</p>
              <Button href={`/dashboard/learn/${course.slug}`} variant="primary" className="mt-4">Resume course</Button>
            </div>
          ) : null}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-[var(--color-ink)]">Learning outcomes</h2>
            <ul className="space-y-2 text-[var(--color-gray)]">
              {course.learningOutcomes.map((outcome) => (
                <li key={outcome} className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-[var(--color-teal)]" />{outcome}</li>
              ))}
            </ul>
          </div>
          <GsapReveal className="space-y-4">
            <Card className="space-y-4 gsap-item">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[var(--color-ink)]">Preview lectures</h3>
              <Badge>{course.lectures.length} lectures</Badge>
            </div>
              {course.lectures.map((lecture) => (
                <button key={lecture.id} type="button" onClick={() => setActiveLecture(lecture.id)} className="gsap-item flex w-full items-center justify-between rounded-2xl border border-[var(--color-border)] px-4 py-3 text-left">
                  <span className="font-medium text-[var(--color-ink)]">{lecture.title}</span>
                  {lecture.isPreview ? <PlayCircle className="h-5 w-5 text-[var(--color-primary)]" /> : <Lock className="h-5 w-5 text-[var(--color-gray)]" />}
                </button>
              ))}
            </Card>
          </GsapReveal>
        </div>
        <div className="space-y-6">
          <AnimatedSection>
            <Card className="space-y-4">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Enroll</p>
              <span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gray)]">Risk-free preview</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Price</p>
              <span className="text-2xl font-semibold text-[var(--color-ink)]">{course.isFree ? "Free" : `$${course.price}`}</span>
            </div>
            <div className="mt-2 text-sm text-[var(--color-gray)]">One payment with lifetime access and a completion certificate.</div>
            <ul className="mb-3 list-inside list-disc text-sm text-[var(--color-gray)]">
              <li>{course.lectures.length} short lessons</li>
              <li>Downloadable resources</li>
              <li>Certificate of completion</li>
            </ul>
            <div className="text-sm text-[var(--color-gray)] mb-2">{course.lectures.some(l => l.isPreview) ? "Free preview available" : "Free preview on select lectures"}</div>
            {user ? (
              justEnrolled || isEnrolled ? (
                <Card className="rounded-md bg-[var(--color-surface)] p-4">
                  <div className="font-semibold text-[var(--color-ink)]">You're in! Here's what's next</div>
                  <div className="text-sm text-[var(--color-gray)]">Check your dashboard to continue learning.</div>
                </Card>
              ) : (
                <>
                  <Button variant={course.isFree ? "primary" : "urgency"} className="w-full" onClick={() => { if (user) { enrollCourse(course.id, user.id); setJustEnrolled(true); } }}>
                    {course.isFree ? "Start learning free" : `Enroll now — $${course.price}`}
                  </Button>
                </>
              )
            ) : (
              <Button href="/login" variant="urgency" className="w-full">Log in to enroll</Button>
            )}
            </Card>
          </AnimatedSection>
          <AnimatedSection>
            <Card className="space-y-3">
              <h3 className="text-xl font-semibold text-[var(--color-ink)]">Current preview</h3>
              {activeLecture ? (
                <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
                  <iframe src={course.lectures.find((lecture) => lecture.id === activeLecture)?.videoUrl} title="Preview" className="h-64 w-full" />
                </div>
              ) : (
                <p className="text-[var(--color-gray)]">Choose a lecture to preview it here.</p>
              )}
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
