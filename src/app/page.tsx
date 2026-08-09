import { AppDownloadCTA } from "@/components/home/AppDownloadCTA";
import { CurriculumTabs } from "@/components/home/CurriculumTabs";
import { FAQ } from "@/components/home/FAQ";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { Leaderboard } from "@/components/home/Leaderboard";
import { MotivationSection } from "@/components/home/MotivationSection";
import { PainPoints } from "@/components/home/PainPoints";
import { Roadmap } from "@/components/home/Roadmap";
import { Stats } from "@/components/home/Stats";
import { StickyEnrollBar } from "@/components/home/StickyEnrollBar";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <div className="bg-white">
      <Hero />
      <StickyEnrollBar />
      <PainPoints />
      <Stats />
      <CurriculumTabs />
      <Features />
      <MotivationSection />
      <Leaderboard />
      <Roadmap />
      <Testimonials />
      <FAQ />
      <AppDownloadCTA />
    </div>
  );
}
