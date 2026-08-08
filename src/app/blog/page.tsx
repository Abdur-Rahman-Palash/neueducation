"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useBlogStore } from "@/store/blogStore";
import { GsapReveal } from "@/components/ui/GsapReveal";

export default function BlogPage() {
  const posts = useBlogStore((state) => state.posts);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">From the blog</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">Insights for curious learners</h1>
      </div>
      <GsapReveal className="grid gap-6 lg:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.id} className="space-y-4 gsap-item">
            <Badge>{post.tags[0]}</Badge>
            <h2 className="text-xl font-semibold text-[var(--color-ink)]">{post.title.en}</h2>
            <p className="text-sm text-[var(--color-gray)]">{post.excerpt.en}</p>
            <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-[var(--color-primary)]">Read article →</Link>
          </Card>
        ))}
      </GsapReveal>
    </div>
  );
}
