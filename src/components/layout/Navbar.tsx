"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";

const LANGS = [
  { code: "bn", label: "বাং", dir: "ltr" },
  { code: "en", label: "EN", dir: "ltr" },
  { code: "ar", label: "ع", dir: "rtl" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = useRef<HTMLElement | null>(null);
  const [isShrunk, setIsShrunk] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale, setLocale] = useState<string>(typeof window !== "undefined" ? (localStorage.getItem("locale") || "en") : "en");
  const { user, logout } = useAuthStore();

  useEffect(() => {
    // apply stored locale on mount
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = LANGS.find(l => l.code === locale)?.dir || "ltr";
      localStorage.setItem("locale", locale);
    }
  }, [locale]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add({}, () => {
      const ctx = gsap.context(() => {
        const onScroll = () => {
          const y = window.scrollY || window.pageYOffset;
          const shouldShrink = y > 50;
          if (shouldShrink === isShrunk) return;
          setIsShrunk(shouldShrink);
          gsap.to(el, { height: shouldShrink ? 56 : 72, boxShadow: shouldShrink ? "0 6px 18px rgba(15,23,42,0.06)" : "none", duration: 0.2, ease: "power2.out" });
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
      }, el);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [isShrunk]);

  useEffect(() => {
    // lock body scroll while menu open
    if (typeof document === "undefined") return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    // close menu on route change
    const handler = () => setMenuOpen(false);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  // mobile focus trap
  useEffect(() => {
    if (!menuOpen) return;
    const panel = document.querySelector("[data-mobile-panel]") as HTMLElement | null;
    if (!panel) return;
    const focusable = panel.querySelectorAll<HTMLElement>("a,button,input,select,textarea,[tabindex]:not([tabindex='-1'])");
    let idx = 0;
    focusable[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      e.preventDefault();
      const forward = !e.shiftKey;
      idx = (idx + (forward ? 1 : -1) + focusable.length) % focusable.length;
      focusable[idx]?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  function handleLocale(code: string) {
    setLocale(code);
    // naive i18n: replace path with locale prefix if your app uses localized routes
    // For now we simply update document.lang/dir and keep route
  }

  const links = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/blog", label: "Blog" },
    { href: "/live", label: "Live" },
  ];

  return (
    <>
      <header ref={headerRef} className="fixed left-0 right-0 top-0 z-40 h-18 bg-white border-b border-[var(--color-border)] transition-all">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4" style={{ height: isShrunk ? 56 : 72 }}>
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-[var(--color-ink)]">
              <span className="text-[var(--color-primary)] font-bold">Neu</span>
              <span className="text-[var(--color-ink)]">Education</span>
            </Link>
            <nav className="hidden lg:flex lg:items-center lg:gap-8" aria-label="Primary">
              {links.map((l) => {
                const active = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
                return (
                  <Link key={l.href} href={l.href} className={`relative text-sm font-medium ${active ? "text-[var(--color-primary)]" : "text-[var(--color-gray)]"} focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2`}>
                    <span className="nav-link inline-block py-2">{l.label}</span>
                    <span className={`absolute left-0 -bottom-1 h-0.5 w-full origin-left transform ${active ? "scale-x-100 bg-[var(--color-primary)]" : "scale-x-0 bg-[var(--color-primary)]"}`} style={{ transition: "transform 150ms ease" }} />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* language pills */}
            <div className="hidden sm:flex items-center gap-2">
              {LANGS.map((l) => (
                <button key={l.code} onClick={() => handleLocale(l.code)} aria-label={`Switch to ${l.code}`} className={`h-8 w-8 rounded-full border text-xs font-medium flex items-center justify-center ${locale === l.code ? "border-[var(--color-primary)] text-[var(--color-primary)]" : "border-[var(--color-border)] text-[var(--color-ink)]"}`}>
                  {l.label}
                </button>
              ))}
            </div>

            {/* auth area */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button aria-haspopup="true" aria-expanded="false" className="h-9 w-9 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-semibold" onClick={() => { /* dropdown toggle handled below */ }}>
                    {user.name?.split(" ")[0].slice(0,2).toUpperCase()}
                  </button>
                  <AnimatePresence>
                    {/* lightweight dropdown - for demo, always hidden until integration */}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Button href="/login" variant="secondary">Log in</Button>
                  <Button href="/signup" variant="primary">Sign up</Button>
                </>
              )}
            </div>

            {/* mobile hamburger */}
            <button aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((s) => !s)} className="md:hidden p-2 rounded-full border border-[var(--color-border)]">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile off-canvas panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="fixed inset-0 z-40 bg-black/40" onClick={() => setMenuOpen(false)} />
            <motion.aside data-mobile-panel initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed right-0 top-0 z-50 h-full w-[320px] bg-white shadow-lg">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between px-4 py-4 border-b">
                  <Link href="/" className="text-lg font-semibold">Neu Education</Link>
                  <button aria-label="Close menu" onClick={() => setMenuOpen(false)} className="p-2"><X className="h-5 w-5" /></button>
                </div>
                <nav className="flex flex-col p-4 gap-2" aria-label="Mobile primary">
                  {links.map((l) => (
                    <Link key={l.href} href={l.href} className="h-12 flex items-center rounded-md px-4 text-sm font-medium text-[var(--color-ink)]" onClick={() => setMenuOpen(false)}>
                      {l.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto p-4">
                  <div className="flex items-center gap-2 mb-4">
                    {LANGS.map((l) => (
                      <button key={l.code} onClick={() => handleLocale(l.code)} className={`h-8 w-8 rounded-full border ${locale === l.code ? "border-[var(--color-primary)] text-[var(--color-primary)]" : "border-[var(--color-border)] text-[var(--color-ink)]"}`}>{l.label}</button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {user ? (
                      <Button href="/dashboard" variant="secondary" className="flex-1">Dashboard</Button>
                    ) : (
                      <>
                        <Button href="/login" variant="secondary" className="flex-1">Log in</Button>
                        <Button href="/signup" variant="primary" className="flex-1">Sign up</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
