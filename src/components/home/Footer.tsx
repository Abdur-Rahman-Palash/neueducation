"use client";

export function Footer() {
  return (
    <footer className="bg-[#0B1739] py-10 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xl font-extrabold text-white">Neu Education</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">Come learn with us and build knowledge, character, and practical confidence together.</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Useful Links</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/courses" className="hover:text-white">কোর্সসমূহ</a></li>
            <li><a href="/blog" className="hover:text-white">ব্লগ</a></li>
            <li><a href="/about" className="hover:text-white">আমাদের সম্পর্কে</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>hello@neueducation.com</li>
            <li>+880 1700-000000</li>
            <li>ঢাকা, বাংলাদেশ</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-white/10 px-5 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© 2026 Neu Education. All rights reserved.</p>
        <p>Version 1.0</p>
      </div>
    </footer>
  );
}
