"use client";

import { ErrorState } from "@/components/ui/error-state";

export default function TasksError({ reset }: { reset: () => void }) {
  return (
    <div className="p-6">
      <ErrorState
        title="Couldn't load tasks"
        message="There was a problem loading your task board. Please try again."
        onRetry={reset}
      />
    </div>
  );
}
