"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useBlogStore } from "@/store/blogStore";
import type { BlogPost } from "@/types";

export default function AdminBlogPage() {
  const posts = useBlogStore((state) => state.posts);
  const addPost = useBlogStore((state) => state.addPost);
  const updatePost = useBlogStore((state) => state.updatePost);
  const deletePost = useBlogStore((state) => state.deletePost);
  const [draft, setDraft] = useState<BlogPost | null>(null);

  const startCreate = () => {
    setDraft({
      id: `post-${Date.now()}`,
      slug: "new-post",
      title: { bn: "নতুন পোস্ট", en: "New Post", ar: "منشور جديد" },
      excerpt: { bn: "সারসংক্ষেপ", en: "Summary", ar: "ملخص" },
      content: { bn: "বিষয়বস্তু", en: "Content", ar: "محتوى" },
      coverImageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
      isPublished: true,
      publishedAt: new Date().toISOString(),
      tags: ["new"],
    });
  };

  const saveDraft = () => {
    if (!draft) return;
    if (posts.some((post) => post.id === draft.id)) updatePost(draft);
    else addPost(draft);
    setDraft(null);
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Blog management</p>
            <h1 className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">Publish and update posts</h1>
          </div>
          <Button variant="primary" onClick={startCreate}>Add post</Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-4">
            {posts.map((post, index) => (
              <AnimatedSection key={post.id} delay={index * 0.04}>
                <Card className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--color-ink)]">{post.title.en}</h2>
                    <p className="text-sm text-[var(--color-gray)]">{post.excerpt.en}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => setDraft(post)}>Edit</Button>
                    <Button variant="urgency" onClick={() => deletePost(post.id)}>Delete</Button>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          {draft ? (
            <AnimatedSection className="space-y-4">
              <Card className="space-y-4">
                <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Edit post</h2>
                <Input label="Title" value={draft.title.en} onChange={(event) => setDraft({ ...draft, title: { ...draft.title, en: event.target.value } })} />
                <Input label="Excerpt" value={draft.excerpt.en} onChange={(event) => setDraft({ ...draft, excerpt: { ...draft.excerpt, en: event.target.value } })} />
                <Input label="Content" value={draft.content.en} onChange={(event) => setDraft({ ...draft, content: { ...draft.content, en: event.target.value } })} />
                <Button variant="primary" className="w-full" onClick={saveDraft}>Save post</Button>
              </Card>
            </AnimatedSection>
          ) : null}
        </div>
      </div>
    </ProtectedRoute>
  );
}
