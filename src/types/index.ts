export type Locale = "bn" | "en" | "ar";
export type UserRole = "student" | "teacher" | "admin";
export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseLanguage = "ar" | "en" | "bn";

export interface Course {
  id: string;
  slug: string;
  title: { bn: string; en: string; ar: string };
  description: { bn: string; en: string; ar: string };
  learningOutcomes: string[];
  price: number;
  currency: "USD";
  isFree: boolean;
  isPublished: boolean;
  language: CourseLanguage;
  category: string;
  level: CourseLevel;
  thumbnailUrl: string;
  instructorId: string;
  instructorName: string;
  rating: number;
  studentCount: number;
  lectures: Lecture[];
  createdAt: string;
}

export interface Lecture {
  id: string;
  courseId: string;
  title: string;
  order: number;
  durationMinutes: number;
  videoUrl: string;
  isPreview: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progressPercent: number;
  enrolledAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: { bn: string; en: string; ar: string };
  excerpt: { bn: string; en: string; ar: string };
  content: { bn: string; en: string; ar: string };
  coverImageUrl: string;
  isPublished: boolean;
  publishedAt: string;
  tags: string[];
}

export interface LiveSession {
  id: string;
  title: { bn: string; en: string; ar: string };
  youtubeVideoId: string;
  isLive: boolean;
  scheduledAt: string;
  courseId: string | null;
  description: string;
}
