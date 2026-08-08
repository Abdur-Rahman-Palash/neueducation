import type { BlogPost, Course, LiveSession, User } from "@/types";

export const demoUser: User = {
  id: "user-student",
  name: "Nadia Rahman",
  email: "student@neu.edu",
  role: "student",
};

export const teacherUser: User = {
  id: "user-teacher",
  name: "Rafiq Hassan",
  email: "teacher@neu.edu",
  role: "teacher",
};

export const adminUser: User = {
  id: "user-admin",
  name: "Mina Karim",
  email: "admin@neu.edu",
  role: "admin",
};

export const mockCourses: Course[] = [
  {
    id: "course-1",
    slug: "arabic-foundations",
    title: { bn: "আরবি ভিত্তি", en: "Arabic Foundations", ar: "أسس اللغة العربية" },
    description: {
      bn: "বিভিন্ন স্তরের শিক্ষার্থীদের জন্য আরবি ভাষা শিখতে সহজ, প্র্যাকটিক্যাল পথ।",
      en: "A practical path to learning Arabic for beginners and intermediate learners.",
      ar: "مسار عملي لتعلم اللغة العربية للمبتدئين والمتوسطين.",
    },
    learningOutcomes: ["Basic conversation", "Reading practice", "Everyday vocabulary"],
    price: 29,
    currency: "USD",
    isFree: false,
    isPublished: true,
    language: "ar",
    category: "Language",
    level: "beginner",
    thumbnailUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    instructorId: "user-teacher",
    instructorName: "Rafiq Hassan",
    rating: 4.8,
    studentCount: 4200,
    lectures: [
      { id: "lec-1", courseId: "course-1", title: "Welcome to Arabic", order: 1, durationMinutes: 12, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", isPreview: true },
      { id: "lec-2", courseId: "course-1", title: "Alphabet and sounds", order: 2, durationMinutes: 18, videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4", isPreview: false },
    ],
    createdAt: "2024-02-01",
  },
  {
    id: "course-2",
    slug: "learn-english-communication",
    title: { bn: "ইংরেজি যোগাযোগ", en: "English Communication", ar: "التواصل باللغة الإنجليزية" },
    description: {
      bn: "স্মার্ট যোগাযোগের জন্য দ্রুত, ব্যবহারিক ইংরেজি শেখা।",
      en: "Fast, practical English for confident communication.",
      ar: "إنجليزية عملية وسريعة للتواصل بثقة.",
    },
    learningOutcomes: ["Speaking fluency", "Interview prep", "Grammar confidence"],
    price: 0,
    currency: "USD",
    isFree: true,
    isPublished: true,
    language: "en",
    category: "Communication",
    level: "beginner",
    thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
    instructorId: "user-teacher",
    instructorName: "Rafiq Hassan",
    rating: 4.7,
    studentCount: 6030,
    lectures: [
      { id: "lec-3", courseId: "course-2", title: "Daily conversation", order: 1, durationMinutes: 15, videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ", isPreview: true },
      { id: "lec-4", courseId: "course-2", title: "Speaking with confidence", order: 2, durationMinutes: 20, videoUrl: "https://www.youtube.com/embed/2Vv-BfVoq4g", isPreview: false },
    ],
    createdAt: "2024-03-10",
  },
  {
    id: "course-3",
    slug: "bangla-digital-marketing",
    title: { bn: "বাংলা ডিজিটাল মার্কেটিং", en: "Bangla Digital Marketing", ar: "التسويق الرقمي بالبنجالية" },
    description: {
      bn: "ব্লগ, সোশ্যাল মিডিয়া আর অনলাইন ব্র্যান্ডিংয়ের জন্য কাজে লাগানোর উপযোগী একটি কোর্স।",
      en: "A practical course for blogging, social media, and online branding.",
      ar: "دورة عملية للمدونات ووسائل التواصل الاجتماعي والتسويق عبر الإنترنت.",
    },
    learningOutcomes: ["Content strategy", "Social growth", "Campaign basics"],
    price: 49,
    currency: "USD",
    isFree: false,
    isPublished: true,
    language: "bn",
    category: "Marketing",
    level: "intermediate",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    instructorId: "user-teacher",
    instructorName: "Rafiq Hassan",
    rating: 4.9,
    studentCount: 2700,
    lectures: [
      { id: "lec-5", courseId: "course-3", title: "Brand storytelling", order: 1, durationMinutes: 10, videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U", isPreview: true },
    ],
    createdAt: "2024-04-12",
  },
  {
    id: "course-4",
    slug: "web-design-essentials",
    title: { bn: "ওয়েব ডিজাইন essentials", en: "Web Design Essentials", ar: "أساسيات تصميم الويب" },
    description: {
      bn: "ব্যবহারকারী-প্রথম ডিজাইনের মূলনীতি শিখুন এবং আপনার প্রথম প্রোডাক্ট তৈরি করুন।",
      en: "Learn the foundations of user-first design and ship a polished first product.",
      ar: "تعلم أساسيات التصميم الذي يركز على المستخدم وقم بإطلاق منتج أولي مصقول.",
    },
    learningOutcomes: ["Wireframing", "UI principles", "Interaction notes"],
    price: 39,
    currency: "USD",
    isFree: false,
    isPublished: true,
    language: "en",
    category: "Design",
    level: "intermediate",
    thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    instructorId: "user-teacher",
    instructorName: "Rafiq Hassan",
    rating: 4.6,
    studentCount: 1890,
    lectures: [
      { id: "lec-6", courseId: "course-4", title: "Design system basics", order: 1, durationMinutes: 16, videoUrl: "https://www.youtube.com/embed/1Rs2ND1ryYc", isPreview: true },
    ],
    createdAt: "2024-05-03",
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "how-to-study-with-purpose",
    title: { bn: "উদ্দেশ্য নিয়ে পড়াশোনা", en: "How to study with purpose", ar: "كيف تدرس بهدف" },
    excerpt: { bn: "একটি কার্যকর শেখার অভ্যাস তৈরি করা", en: "Build a more focused learning habit", ar: "أنشئ عادة تعلم أكثر تركيزًا" },
    content: { bn: "শেখা সফল হতে হলে আপনাকে নিজের লক্ষ্য পরিষ্কার রাখতে হবে।", en: "Learning becomes easier when you define the outcome first.", ar: "يصبح التعلم أسهل عندما تحدد النتيجة أولًا." },
    coverImageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    isPublished: true,
    publishedAt: "2024-08-01",
    tags: ["study", "motivation"],
  },
  {
    id: "post-2",
    slug: "why-live-learning-feels-different",
    title: { bn: "লাইভ শেখা কেন আলাদা", en: "Why live learning feels different", ar: "لماذا يشعر التعلم المباشر بالاختلاف" },
    excerpt: { bn: "লাইভ সেশনের সাথে প্রতিদিনের অনুশীলন", en: "The energy of live sessions and practice", ar: "طاقة الجلسات المباشرة والتدريب" },
    content: { bn: "লাইভ সেশন শেখাকে বাস্তব এবং আকর্ষণীয় করে তোলে।", en: "Live sessions create accountability and momentum.", ar: "تخلق الجلسات المباشرة مسؤولية وزخمًا." },
    coverImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    isPublished: true,
    publishedAt: "2024-07-20",
    tags: ["live", "community"],
  },
];

export const mockLiveSessions: LiveSession[] = [
  {
    id: "live-1",
    title: { bn: "লাইভ প্রশ্নোত্তর", en: "Live Q&A", ar: "أسئلة وأجوبة مباشرة" },
    youtubeVideoId: "dQw4w9WgXcQ",
    isLive: true,
    scheduledAt: "2026-08-10T19:00:00",
    courseId: "course-1",
    description: "Join the instructor for a live study session.",
  },
];
