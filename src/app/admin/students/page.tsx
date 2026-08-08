"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card } from "@/components/ui/Card";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { demoUser, teacherUser, adminUser } from "@/lib/mockData";

const students = [demoUser, teacherUser, adminUser];

export default function AdminStudentsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">User management</p>
          <h1 className="mt-2 text-3xl font-semibold text-[var(--color-ink)]">Student and collaborator roster</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {students.map((student, index) => (
            <AnimatedSection key={student.id} delay={index * 0.05}>
              <Card className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-[var(--color-ink)]">{student.name}</h2>
                  <Badge>{student.role}</Badge>
                </div>
                <p className="text-sm text-[var(--color-gray)]">{student.email}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
