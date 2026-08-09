import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/layout/Header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
