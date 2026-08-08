"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, UserCircle, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Blog" },
  { href: "/live", label: "Live" },
];

export function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/95 shadow-sm backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 rounded-full bg-[var(--color-surface)] px-3 py-2 text-lg font-semibold text-[var(--color-ink)] transition-shadow hover:shadow-sm">
          <BookOpen className="h-5 w-5 text-[var(--color-primary)]" />
          Neu Education
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${pathname === link.href ? "text-[var(--color-primary)]" : "text-[var(--color-gray)] hover:text-[var(--color-primary)]"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button
                href={user.role === "student" ? "/dashboard" : user.role === "teacher" ? "/teacher" : "/admin"}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <UserCircle className="h-4 w-4" />
                {user.role}
              </Button>
              <button type="button" onClick={logout} className="text-sm font-medium text-[var(--color-gray)] transition hover:text-[var(--color-primary)]">
                Logout
              </button>
            </>
          ) : (
            <>
              <Button href="/login" variant="secondary" className="px-4 py-2">
                Login
              </Button>
              <Button href="/signup" variant="primary" className="px-4 py-2">
                Sign up
              </Button>
            </>
          )}

          <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="rounded-full border border-[var(--color-border)] p-2 md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <button type="button" className="absolute inset-0 bg-black/30" onClick={() => setMobileMenuOpen(false)} aria-label="Close mobile menu" />
          <div className="relative ml-auto h-full w-[280px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-4 py-4">
              <Link href="/" className="text-lg font-semibold text-[var(--color-ink)]">
                Neu Education
              </Link>
              <button type="button" onClick={() => setMobileMenuOpen(false)} className="rounded-full border border-[var(--color-border)] p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 p-4">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="rounded-md px-4 py-3 text-sm font-medium text-[var(--color-ink)]">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t p-4">
                <Button href="/login" variant="secondary" className="w-full">
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
