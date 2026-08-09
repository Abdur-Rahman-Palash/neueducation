import { create } from "zustand";
import { persist } from "zustand/middleware";
import { adminUser, demoUser, teacherUser } from "@/lib/mockData";
import type { User, UserRole } from "@/types";

export const roleLandingPathMap: Record<UserRole, string> = {
  student: "/dashboard",
  teacher: "/teacher",
  admin: "/admin",
};

export const getRoleLandingPath = (role: UserRole | undefined) => {
  if (!role) {
    return "/";
  }

  return roleLandingPathMap[role] ?? "/";
};

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  users: User[];
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, role: UserRole, photoUrl?: string) => boolean;
  logout: () => void;
}

const seedUsers: User[] = [
  { ...demoUser, password: "password123" },
  { ...teacherUser, password: "password123" },
  { ...adminUser, password: "password123" },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      users: seedUsers,
      login: (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        const users = get().users;
        const user = users.find((candidate) => candidate.email.toLowerCase() === normalizedEmail && candidate.password === password);

        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }

        return false;
      },
      signup: (name, email, password, role, photoUrl) => {
        const normalizedEmail = email.trim().toLowerCase();
        const existing = get().users.find((candidate) => candidate.email.toLowerCase() === normalizedEmail);

        if (existing) {
          return false;
        }

        const newUser: User = {
          id: `user-${Date.now()}`,
          name: name.trim(),
          email: normalizedEmail,
          password,
          role,
          photoUrl,
        };

        const users = [...get().users, newUser];
        set({ user: newUser, isAuthenticated: true, users });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "neu-auth-store" },
  ),
);

export const requireRole = (user: User | null, roles: UserRole[]) => user && roles.includes(user.role);
