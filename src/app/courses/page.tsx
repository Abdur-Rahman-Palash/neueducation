"use client";

import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useCourseStore } from "@/store/courseStore";
import { SkeletonCard, Skeleton } from "@/components/ui/Skeleton";
import { GsapReveal } from "@/components/ui/GsapReveal";

function CoursesContent() {
  const router = useRouter();
  const params = useSearchParams();
  const courses = useCourseStore((state) => state.courses);
  const language = params.get("language") ?? "all";
  const level = params.get("level") ?? "all";
  const category = params.get("category") ?? "all";
  const price = params.get("price") ?? "all";
  const sort = params.get("sort") ?? "popular"; // default to Most popular

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesLanguage = language === "all" || course.language === language;
      const matchesLevel = level === "all" || course.level === level;
      const matchesCategory = category === "all" || course.category === category;
      const matchesPrice = price === "all" || (price === "free" ? course.isFree : course.price > 0);
      return matchesLanguage && matchesLevel && matchesCategory && matchesPrice;
    });
  }, [category, courses, language, level, price]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    if (sort === "popular") return copy.sort((a, b) => (b.studentCount || 0) - (a.studentCount || 0));
    if (sort === "rating") return copy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sort === "newest") return copy.sort((a, b) => (b.createdAt ? Date.parse(b.createdAt) : 0) - (a.createdAt ? Date.parse(a.createdAt) : 0));
    return copy;
  }, [filtered, sort]);

  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === "all") next.delete(key); else next.set(key, value);
    router.replace(`/courses?${next.toString()}`);
  };

  const updateSort = (value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === "popular") next.delete("sort"); else next.set("sort", value);
    router.replace(`/courses?${next.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Course catalog</p>
          <h1 className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">Find the right path for your next skill</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <select className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" value={language} onChange={(event) => updateFilter("language", event.target.value)}>
            <option value="all">All languages</option>
            <option value="bn">Bangla</option>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
          <select className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" value={level} onChange={(event) => updateFilter("level", event.target.value)}>
            <option value="all">All levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <select className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" value={price} onChange={(event) => updateFilter("price", event.target.value)}>
            <option value="all">Any price</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
          <select className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)]" value={sort} onChange={(e) => updateSort(e.target.value)}>
            <option value="popular">Most popular</option>
            <option value="rating">Top rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sorted.length === 0 ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <Card className="space-y-4">
                <SkeletonCard />
              </Card>
            </div>
          ))
        ) : (
          sorted.map((course) => (
          <Card key={course.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge>{course.category}</Badge>
              <span className="text-sm font-semibold text-[var(--color-gold)]">★ {course.rating}</span>
            </div>
            <h2 className="text-xl font-semibold text-[var(--color-ink)]">{course.title.en}</h2>
            <p className="text-sm text-[var(--color-gray)]">{course.description.en}</p>
            <div className="flex items-center justify-between text-sm text-[var(--color-gray)]">
              <span>{course.level}</span>
              <span>{course.isFree ? "Free" : `$${course.price}`}</span>
            </div>
            <Button href={`/courses/${course.slug}`} variant="secondary" className="w-full">
              View Course
            </Button>
          </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={
      <div className="px-4 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4"><SkeletonCard /></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <CoursesContent />
    </Suspense>
  );
}
