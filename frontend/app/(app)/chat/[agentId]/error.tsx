"use client";

import { ErrorState } from "@/components/ui/error-state";

export default function ChatError({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-[calc(100vh-56px)] items-center justify-center p-6">
      <ErrorState
        title="Chat unavailable"
        message="There was a problem connecting to this agent. Please try again."
        onRetry={reset}
      />
    </div>
  );
}
