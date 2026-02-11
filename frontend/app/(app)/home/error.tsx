"use client";

import { ErrorState } from "@/components/ui/error-state";

export default function HomeError({ reset }: { reset: () => void }) {
  return (
    <div className="p-6">
      <ErrorState
        title="Couldn't load dashboard"
        message="There was a problem loading your dashboard. Please try again."
        onRetry={reset}
      />
    </div>
  );
}
