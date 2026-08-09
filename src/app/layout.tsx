import type { Metadata } from "next";
import { Hind_Siliguri, Poppins } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { AnimatedLayout } from "@/components/layout/AnimatedLayout";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Neu Education LMS",
  description: "A modern multilingual learning platform for Arabic, English, and Bangla learners.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="auto" className={`${poppins.variable} ${hindSiliguri.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full bg-white text-[#101828]">
        <AnimatedLayout>
          <AppShell>{children}</AppShell>
        </AnimatedLayout>
      </body>
    </html>
  );
}
