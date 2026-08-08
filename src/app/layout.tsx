import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { AnimatedLayout } from "@/components/layout/AnimatedLayout";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neu Education LMS",
  description: "A modern multilingual learning platform for Arabic, English, and Bangla learners.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sora.variable} ${inter.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full bg-transparent text-[var(--color-ink)]">
        <AnimatedLayout>
          <AppShell>{children}</AppShell>
        </AnimatedLayout>
      </body>
    </html>
  );
}
