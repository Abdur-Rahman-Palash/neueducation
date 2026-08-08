const namesEn = ["Rahim", "Fatima", "Aisha", "Omar", "Hassan", "Sara", "Kamal", "Laila", "Ibrahim", "Zainab"];
const namesBn = ["রহিম", "ফাতেমা", "আনিসা", "ওমর", "হাসান", "সারা", "কামাল", "লায়লা", "ইব্রাহিম", "জয়নাব"];
const courses = [
  "Quranic Arabic Basics",
  "Tafsir Fundamentals",
  "Arabic Foundations",
  "Classical Grammar Essentials",
  "Recitation & Tajweed",
  "Conversational Arabic",
  "Modern Tafsir Studies",
  "Qiraat Practice",
];

function randInt(max: number) { return Math.floor(Math.random() * max); }

function timeAgoMinutes(mins: number) {
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const h = Math.floor(mins / 60);
  return `${h}h ago`;
}

export type ActivityItem = {
  id: string;
  name: string;
  course: string;
  action: string;
  time: string;
};

export function generateActivities(count = 18): ActivityItem[] {
  const items: ActivityItem[] = [];
  for (let i = 0; i < count; i++) {
    const useBn = Math.random() < 0.35;
    const name = useBn ? namesBn[randInt(namesBn.length)] : namesEn[randInt(namesEn.length)];
    const course = courses[randInt(courses.length)];
    const actionType = Math.random() < 0.6 ? "enrolled in" : "completed";
    const action = actionType === "enrolled in" ? (useBn ? "ভর্তি হয়েছেন" : "just enrolled in") : (useBn ? "সম্পন্ন করেছেন" : "completed");
    const mins = 1 + randInt(60 * 6);
    items.push({
      id: `act-${Date.now()}-${i}`,
      name,
      course,
      action,
      time: timeAgoMinutes(mins),
    });
  }
  return items;
}

export const mockActivities = generateActivities();
