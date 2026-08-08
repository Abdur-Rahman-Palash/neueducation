"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const signup = useAuthStore((state) => state.signup);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("student@neu.edu");
  const [password, setPassword] = useState("password123");
  const [name, setName] = useState("Aisha Khan");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (mode === "login") {
      const ok = login(email, password);
      if (!ok) {
        setError("Use student@neu.edu, teacher@neu.edu, or admin@neu.edu with password123.");
        return;
      }
      router.replace("/");
      return;
    }
    signup(name, email);
    router.replace("/");
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:px-8">
      <div className="flex-1 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Welcome back</p>
        <h1 className="text-3xl font-semibold text-[var(--color-ink)]">Sign in to continue learning</h1>
        <p className="text-[var(--color-gray)]">Demo accounts are ready for student, teacher, and admin access.</p>
        <div className="rounded-2xl bg-[var(--color-surface)] p-4 text-sm text-[var(--color-gray)]">
          <p className="font-semibold text-[var(--color-ink)]">Demo credentials</p>
          <p>student@neu.edu / password123</p>
          <p>teacher@neu.edu / password123</p>
          <p>admin@neu.edu / password123</p>
        </div>
      </div>
      <Card className="w-full max-w-md space-y-4">
        <div className="flex gap-3">
          <Button variant={mode === "login" ? "primary" : "secondary"} className="flex-1" onClick={() => setMode("login")}>Login</Button>
          <Button variant={mode === "signup" ? "primary" : "secondary"} className="flex-1" onClick={() => setMode("signup")}>Signup</Button>
        </div>
        {mode === "signup" ? <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} /> : null}
        <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {mode === "login" ? <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> : null}
        {error ? <p className="text-sm text-[var(--color-energy)]">{error}</p> : null}
        <Button variant="primary" className="w-full" onClick={handleSubmit}>{mode === "login" ? "Sign in" : "Create account"}</Button>
      </Card>
    </div>
  );
}
