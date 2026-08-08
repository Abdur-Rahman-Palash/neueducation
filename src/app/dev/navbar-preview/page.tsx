"use client";

import { Navbar } from "@/components/layout/Navbar";

export default function PreviewPage() {
  return (
    <div>
      <Navbar />
      <main className="mt-24 p-8">
        <h1 className="text-3xl font-semibold">Navbar preview</h1>
        <p className="mt-4 text-sm text-[var(--color-gray)]">This page previews the new Navbar component before wiring it into the site layout.</p>
        <div className="mt-8 space-y-24">
          <div className="h-96 rounded-md border border-[var(--color-border)] bg-white">Scroll content area</div>
          <div className="h-96 rounded-md border border-[var(--color-border)] bg-white">More content</div>
        </div>
      </main>
    </div>
  );
}
