"use client";

import { ErrorState } from "@/components/ui/error-state";

export default function SettingsError({ reset }: { reset: () => void }) {
  return (
    <div className="p-6">
      <ErrorState
        title="Couldn't load settings"
        message="There was a problem loading your settings. Please try again."
        onRetry={reset}
      />
    </div>
  );
}
