"use client";

import { useLiveStore } from "@/store/liveStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function LivePage() {
  const sessions = useLiveStore((state) => state.sessions);
  const activeSession = sessions[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Live learning</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">Catch up on the next class</h1>
      </div>
      <Card className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--color-ink)]">{activeSession.title.en}</h2>
            <p className="mt-2 text-[var(--color-gray)]">{activeSession.description}</p>
          </div>
          <Badge>{activeSession.isLive ? "Live now" : "Upcoming"}</Badge>
        </div>
        <div className="overflow-hidden rounded-3xl border border-[var(--color-border)]">
          <iframe src={`https://www.youtube.com/embed/${activeSession.youtubeVideoId}`} className="h-80 w-full" title={activeSession.title.en} allowFullScreen />
        </div>
      </Card>
    </div>
  );
}
