import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockLiveSessions } from "@/lib/mockData";
import type { LiveSession } from "@/types";

interface LiveStore {
  sessions: LiveSession[];
  addSession: (session: LiveSession) => void;
  updateSession: (session: LiveSession) => void;
  deleteSession: (id: string) => void;
  toggleLive: (id: string) => void;
}

export const useLiveStore = create<LiveStore>()(
  persist(
    (set) => ({
      sessions: mockLiveSessions,
      addSession: (session) => set((state) => ({ sessions: [session, ...state.sessions] })),
      updateSession: (session) => set((state) => ({ sessions: state.sessions.map((item) => (item.id === session.id ? session : item)) })),
      deleteSession: (id) => set((state) => ({ sessions: state.sessions.filter((session) => session.id !== id) })),
      toggleLive: (id) => set((state) => ({ sessions: state.sessions.map((session) => (session.id === id ? { ...session, isLive: !session.isLive } : session)) })),
    }),
    { name: "neu-live-store" },
  ),
);
