"use client";

import { useParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useBlogStore } from "@/store/blogStore";

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = useBlogStore((state) => state.getPostBySlug(params.slug));

  if (!post) return <div className="px-4 py-20 text-center text-[var(--color-gray)]">Post not found.</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Card className="space-y-6">
        <div className="space-y-3">
          <Badge>{post.tags.join(", ")}</Badge>
          <h1 className="text-3xl font-semibold text-[var(--color-ink)]">{post.title.en}</h1>
          <p className="text-[var(--color-gray)]">{post.excerpt.en}</p>
        </div>
        <div className="rounded-3xl border border-[var(--color-border)] p-6 text-[var(--color-gray)]">{post.content.en}</div>
      </Card>
    </div>
  );
}
