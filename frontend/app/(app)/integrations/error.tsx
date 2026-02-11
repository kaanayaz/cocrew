"use client";

import { ErrorState } from "@/components/ui/error-state";

export default function IntegrationsError({ reset }: { reset: () => void }) {
  return (
    <div className="p-6">
      <ErrorState
        title="Couldn't load integrations"
        message="There was a problem loading your integrations. Please try again."
        onRetry={reset}
      />
    </div>
  );
}
