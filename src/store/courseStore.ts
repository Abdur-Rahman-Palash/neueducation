import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockCourses } from "@/lib/mockData";
import type { Course, Enrollment } from "@/types";

interface CourseStore {
  courses: Course[];
  enrollments: Enrollment[];
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  enrollCourse: (courseId: string, userId: string) => void;
  updateProgress: (courseId: string, progress: number) => void;
  getCourseBySlug: (slug: string) => Course | undefined;
  getEnrolledCourseIds: (userId: string) => string[];
}

const createEnrollment = (courseId: string, userId: string): Enrollment => ({
  id: `${courseId}-${userId}`,
  userId,
  courseId,
  progressPercent: 20,
  enrolledAt: new Date().toISOString(),
});

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      courses: mockCourses,
      enrollments: [],
      setCourses: (courses) => set({ courses }),
      addCourse: (course) => set((state) => ({ courses: [course, ...state.courses] })),
      updateCourse: (course) =>
        set((state) => ({
          courses: state.courses.map((item) => (item.id === course.id ? course : item)),
        })),
      deleteCourse: (id) =>
        set((state) => ({
          courses: state.courses.filter((course) => course.id !== id),
          enrollments: state.enrollments.filter((enrollment) => enrollment.courseId !== id),
        })),
      enrollCourse: (courseId, userId) => {
        const existing = get().enrollments.find((item) => item.courseId === courseId && item.userId === userId);
        if (existing) return;
        set((state) => ({ enrollments: [...state.enrollments, createEnrollment(courseId, userId)] }));
      },
      updateProgress: (courseId, progress) =>
        set((state) => ({
          enrollments: state.enrollments.map((item) => (item.courseId === courseId ? { ...item, progressPercent: progress } : item)),
        })),
      getCourseBySlug: (slug) => get().courses.find((course) => course.slug === slug),
      getEnrolledCourseIds: (userId) => get().enrollments.filter((item) => item.userId === userId).map((item) => item.courseId),
    }),
    { name: "neu-course-store" },
  ),
);
