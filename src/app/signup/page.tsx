"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuthStore } from "@/store/authStore";

export default function SignupPage() {
  const router = useRouter();
  const signup = useAuthStore((state) => state.signup);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email to continue.");
      return;
    }

    signup(name.trim(), email.trim());
    router.replace("/");
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:px-8">
      <div className="flex-1 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Create your account</p>
        <h1 className="text-3xl font-semibold text-[var(--color-ink)]">Get started with Neu Education</h1>
        <p className="text-[var(--color-gray)]">Join as a student and begin exploring courses, tracking progress, and unlocking new learning paths.</p>
        <div className="rounded-2xl bg-[var(--color-surface)] p-4 text-sm text-[var(--color-gray)]">
          <p className="font-semibold text-[var(--color-ink)]">Signup note</p>
          <p>You can use any valid email to create a demo student account.</p>
          <p>After signup, you’ll be redirected to the dashboard experience.</p>
        </div>
      </div>
      <Card className="w-full max-w-md space-y-4">
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {error ? <p className="text-sm text-[var(--color-energy)]">{error}</p> : null}
        <Button variant="primary" className="w-full" onClick={handleSubmit}>
          Create account
        </Button>
      </Card>
    </div>
  );
}
