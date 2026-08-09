"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getRoleLandingPath, useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("student@neu.edu");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const emailFromQuery = params.get("email");

    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password to continue.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const ok = login(email, password);

    if (!ok) {
      setIsSubmitting(false);
      setError("Use a valid role account from the signup flow or the seeded demo credentials.");
      return;
    }

    const signedInUser = useAuthStore.getState().user;
    const rolePath = getRoleLandingPath(signedInUser?.role);

    setIsSubmitting(false);
    router.replace(rolePath);
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
      <Card className="w-full max-w-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error ? <p className="text-sm text-[var(--color-energy)]">{error}</p> : null}
          <Button type="submit" variant="primary" className="w-full rounded-full py-3" disabled={isSubmitting} isLoading={isSubmitting}>
            Log in
          </Button>
        </form>
      </Card>
    </div>
  );
}
