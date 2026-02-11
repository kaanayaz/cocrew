"use client";

import { CONNECTORS } from "@/lib/constants";
import { Plug } from "lucide-react";

const connectorList = Object.entries(CONNECTORS).map(([key, c]) => ({
  ...c,
  key,
}));

export function ConnectorPicker() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-text-primary">
          Connect Your Tools
        </h2>
        <p className="mt-2 text-text-secondary">
          Connect your tools to give your agents superpowers. You can skip this
          and connect later from Settings.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {connectorList.map((connector) => (
          <div
            key={connector.key}
            className="rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: connector.brandColor + "15" }}
              >
                <Plug
                  className="h-5 w-5"
                  style={{ color: connector.brandColor }}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">
                  {connector.name}
                </h3>
                <p className="text-xs capitalize text-text-muted">
                  {connector.category}
                </p>
              </div>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-text-secondary">
              {connector.description}
            </p>
            <button
              className="w-full rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-slate-50"
              disabled
              title="You can connect tools after onboarding"
            >
              Connect later
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
