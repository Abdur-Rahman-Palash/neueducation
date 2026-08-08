import { create } from "zustand";
import { persist } from "zustand/middleware";
import { adminUser, demoUser, teacherUser } from "@/lib/mockData";
import type { User, UserRole } from "@/types";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string) => void;
  logout: () => void;
}

const demoAccounts: Record<string, User> = {
  "student@neu.edu": demoUser,
  "teacher@neu.edu": teacherUser,
  "admin@neu.edu": adminUser,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        const user = demoAccounts[normalizedEmail];
        if (user && password === "password123") {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      signup: (name, email) => {
        const newUser: User = { id: `user-${Date.now()}`, name, email, role: "student" };
        set({ user: newUser, isAuthenticated: true });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "neu-auth-store" },
  ),
);

export const requireRole = (user: User | null, roles: UserRole[]) => user && roles.includes(user.role);
