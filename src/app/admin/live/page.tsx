"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useLiveStore } from "@/store/liveStore";
import type { LiveSession } from "@/types";

export default function AdminLivePage() {
  const sessions = useLiveStore((state) => state.sessions);
  const addSession = useLiveStore((state) => state.addSession);
  const updateSession = useLiveStore((state) => state.updateSession);
  const deleteSession = useLiveStore((state) => state.deleteSession);
  const toggleLive = useLiveStore((state) => state.toggleLive);
  const [draft, setDraft] = useState<LiveSession | null>(null);

  const startCreate = () => {
    setDraft({
      id: `live-${Date.now()}`,
      title: { bn: "নতুন লাইভ", en: "New Live Session", ar: "جلسة مباشرة جديدة" },
      youtubeVideoId: "dQw4w9WgXcQ",
      isLive: false,
      scheduledAt: new Date().toISOString(),
      courseId: null,
      description: "Description",
    });
  };

  const saveDraft = () => {
    if (!draft) return;
    if (sessions.some((session) => session.id === draft.id)) updateSession(draft);
    else addSession(draft);
    setDraft(null);
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Live sessions</p>
            <h1 className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">Schedule and toggle live events</h1>
          </div>
          <Button variant="primary" onClick={startCreate}>Add session</Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <AnimatedSection key={session.id} delay={index * 0.04}>
                <Card className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--color-ink)]">{session.title.en}</h2>
                    <p className="text-sm text-[var(--color-gray)]">{session.description}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => setDraft(session)}>Edit</Button>
                    <Button variant="urgency" onClick={() => deleteSession(session.id)}>Delete</Button>
                    <Button variant="primary" onClick={() => toggleLive(session.id)}>{session.isLive ? "Stop" : "Go live"}</Button>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          {draft ? (
            <AnimatedSection className="space-y-4">
              <Card className="space-y-4">
                <h2 className="text-2xl font-semibold text-[var(--color-ink)]">Edit live session</h2>
                <Input label="Title" value={draft.title.en} onChange={(event) => setDraft({ ...draft, title: { ...draft.title, en: event.target.value } })} />
                <Input label="YouTube ID" value={draft.youtubeVideoId} onChange={(event) => setDraft({ ...draft, youtubeVideoId: event.target.value })} />
                <Input label="Description" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
                <Button variant="primary" className="w-full" onClick={saveDraft}>Save session</Button>
              </Card>
            </AnimatedSection>
          ) : null}
        </div>
      </div>
    </ProtectedRoute>
  );
}
