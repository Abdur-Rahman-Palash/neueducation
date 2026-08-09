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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email to continue.");
      return;
    }

    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password confirmation does not match.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const ok = signup(name.trim(), email.trim(), password.trim(), role, photoUrl.trim() || undefined);

    if (!ok) {
      setIsSubmitting(false);
      setError("This email is already registered. Please use another one.");
      return;
    }

    router.push(`/login?email=${encodeURIComponent(email.trim().toLowerCase())}`);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:px-8">
      <div className="flex-1 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">Create your account</p>
        <h1 className="text-3xl font-semibold text-[var(--color-ink)]">Get started with Neu Education</h1>
        <p className="text-[var(--color-gray)]">Join as a student and begin exploring courses, tracking progress, and unlocking new learning paths.</p>
        <div className="rounded-2xl bg-[var(--color-surface)] p-4 text-sm text-[var(--color-gray)]">
          <p className="font-semibold text-[var(--color-ink)]">Signup note</p>
          <p>You can create a student, teacher, or admin account.</p>
          <p>After signup, you’ll be redirected to the login page to sign in.</p>
        </div>
      </div>
      <Card className="w-full max-w-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="flex flex-col gap-2 text-sm font-medium text-[var(--color-ink)]">
            <span>Role</span>
            <select className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 outline-none focus:border-[var(--color-primary)]" value={role} onChange={(e) => setRole(e.target.value as "student" | "teacher" | "admin") }>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <Input label="Photo URL" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://example.com/avatar.jpg" />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {error ? <p className="text-sm text-[var(--color-energy)]">{error}</p> : null}
          <Button type="submit" variant="primary" className="w-full rounded-full py-3" disabled={isSubmitting} isLoading={isSubmitting}>
            Sign Up
          </Button>
          <p className="text-center text-sm text-[var(--color-gray)]">
            <span>Already have an account?</span>{" "}
            <button type="button" className="font-semibold text-[var(--color-primary)] underline underline-offset-2" onClick={() => router.push("/login")}>Log in</button>
          </p>
        </form>
      </Card>
    </div>
  );
}
