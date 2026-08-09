"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
];

export function Header() {
  const { scrollY } = useScroll();
  const blurValue = useTransform(scrollY, [0, 40], [0, 14]);

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-slate-200/80"
      style={{ backgroundColor: "rgba(255,255,255,0.96)", backdropFilter: `blur(${blurValue.get() ?? 0}px)` }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1447E6] text-lg font-black text-white shadow-lg">
            ن
          </span>
          <span className="text-lg font-black tracking-tight text-[#0B1739]">
            Neu <span className="text-[#1447E6]">Education</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-[#1447E6]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B1739] transition hover:bg-slate-50">
            Login
          </Link>
          <Link href="/signup" className="rounded-xl bg-[#1447E6] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#12297A]">
            Sign up
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
