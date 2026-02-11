"use client";

import { cn } from "@/lib/utils";

/* ── Pulse bar ── */
function Bone({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-200",
        className
      )}
    />
  );
}

/* ── Home page skeleton ── */
export function HomeSkeleton() {
  return (
    <div className="p-6 animate-in fade-in duration-300">
      {/* Greeting */}
      <Bone className="h-8 w-48" />
      {/* Quick action */}
      <div className="mt-4 flex items-center gap-2">
        <Bone className="h-10 w-full max-w-lg rounded-lg" />
        <Bone className="h-10 w-10 rounded-lg" />
      </div>
      {/* Connector health dots */}
      <div className="mt-6 flex gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Bone key={i} className="h-4 w-20" />
        ))}
      </div>
      {/* Stats cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-white p-4 space-y-3"
          >
            <Bone className="h-4 w-24" />
            <Bone className="h-8 w-16" />
            <Bone className="h-3 w-12" />
          </div>
        ))}
      </div>
      {/* Activity feed */}
      <div className="mt-8 space-y-3">
        <Bone className="h-4 w-28" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg border border-border bg-white p-4"
          >
            <Bone className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Bone className="h-4 w-48" />
              <Bone className="h-3 w-64" />
              <Bone className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Task board skeleton ── */
export function TaskBoardSkeleton() {
  return (
    <div className="p-6 animate-in fade-in duration-300">
      <div className="mb-6">
        <Bone className="h-8 w-24" />
        <Bone className="mt-2 h-4 w-48" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {["Todo", "In Progress", "Done"].map((label) => (
          <div key={label} className="space-y-3">
            <Bone className="h-5 w-20" />
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-white p-4 space-y-3"
              >
                <div className="flex items-start gap-2">
                  <Bone className="mt-1 h-2 w-2 rounded-full" />
                  <Bone className="h-4 w-full" />
                </div>
                <Bone className="ml-4 h-3 w-3/4" />
                <div className="flex items-center gap-2 ml-4">
                  <Bone className="h-6 w-6 rounded-full" />
                  <Bone className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Integrations page skeleton ── */
export function IntegrationsSkeleton() {
  return (
    <div className="p-6 animate-in fade-in duration-300">
      <div className="mb-6">
        <Bone className="h-8 w-32" />
        <Bone className="mt-2 h-4 w-64" />
      </div>
      <Bone className="mb-4 h-4 w-24" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-white p-5 space-y-3"
          >
            <div className="flex items-center gap-3">
              <Bone className="h-10 w-10 rounded-lg" />
              <div className="space-y-1.5">
                <Bone className="h-4 w-24" />
                <Bone className="h-3 w-16" />
              </div>
            </div>
            <Bone className="h-3 w-full" />
            <Bone className="h-8 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Chat page skeleton ── */
export function ChatSkeleton() {
  return (
    <div className="flex h-[calc(100vh-56px)] animate-in fade-in duration-300">
      <div className="flex flex-1 flex-col">
        {/* Agent header */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Bone className="h-10 w-10 rounded-full" />
          <div className="space-y-1.5">
            <Bone className="h-4 w-20" />
            <Bone className="h-3 w-28" />
          </div>
        </div>
        {/* Messages area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Bone className="h-16 w-16 rounded-2xl" />
            <Bone className="h-5 w-32" />
            <Bone className="h-3 w-48" />
          </div>
        </div>
        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="mx-auto max-w-2xl">
            <Bone className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Settings skeleton ── */
export function SettingsSkeleton() {
  return (
    <div className="p-6 animate-in fade-in duration-300">
      <Bone className="h-8 w-24" />
      <Bone className="mt-2 h-4 w-48" />
      <div className="mt-6 flex gap-4 border-b border-border pb-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Bone key={i} className="h-5 w-20" />
        ))}
      </div>
      <div className="mt-6 max-w-lg space-y-6">
        <div className="space-y-2">
          <Bone className="h-4 w-16" />
          <Bone className="h-10 w-full rounded-lg" />
        </div>
        <div className="space-y-2">
          <Bone className="h-4 w-12" />
          <Bone className="h-10 w-full rounded-lg" />
        </div>
        <Bone className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  );
}

/* ── Billing skeleton ── */
export function BillingSkeleton() {
  return (
    <div className="p-6 animate-in fade-in duration-300">
      <Bone className="h-4 w-16" />
      <Bone className="mt-4 h-8 w-20" />
      <Bone className="mt-2 h-4 w-40" />
      {/* Credit balance card */}
      <Bone className="mt-6 h-32 w-full max-w-sm rounded-xl" />
      {/* Credit packs */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-2xl">
        {Array.from({ length: 3 }).map((_, i) => (
          <Bone key={i} className="h-48 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
