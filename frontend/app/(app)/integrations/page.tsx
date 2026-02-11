"use client";

import { useState } from "react";
import { ConnectorCard } from "@/components/connectors/ConnectorCard";
import { ApiKeyConnectDialog } from "@/components/connectors/ApiKeyConnectDialog";
import {
  CONNECTOR_CONFIGS,
  type ConnectorConfig,
  type ConnectorSlug,
} from "@/lib/connectors/registry";

const connectorList = Object.entries(CONNECTOR_CONFIGS).map(
  ([key, config]) => ({
    ...config,
    key: key as ConnectorSlug,
  })
);

export default function IntegrationsPage() {
  const [connectedSlugs, setConnectedSlugs] = useState<Set<string>>(
    new Set()
  );
  const [apiKeyDialogConnector, setApiKeyDialogConnector] =
    useState<ConnectorConfig | null>(null);

  const connected = connectorList.filter((c) =>
    connectedSlugs.has(c.slug)
  );
  const available = connectorList.filter(
    (c) => !connectedSlugs.has(c.slug)
  );

  function handleConnect(connector: ConnectorConfig) {
    if (connector.authType === "api_key") {
      setApiKeyDialogConnector(connector);
    } else {
      // OAuth connectors — will redirect to OAuth flow once configured
      alert(
        `OAuth flow for ${connector.name} will be available once you set up the developer app credentials.`
      );
    }
  }

  async function handleApiKeyConnect(credentials: Record<string, string>): Promise<boolean> {
    // For now, simulate connection success
    // In Phase 11, this will actually call the API to test + store credentials
    if (!apiKeyDialogConnector) return false;

    // Log credentials for debugging (remove in production)
    console.log(`Connecting ${apiKeyDialogConnector.slug} with:`, Object.keys(credentials));

    // Simulate API call delay
    await new Promise((r) => setTimeout(r, 1000));

    setConnectedSlugs((prev) => {
      const next = new Set(prev);
      next.add(apiKeyDialogConnector.slug);
      return next;
    });
    return true;
  }

  return (
    <div className="p-6 animate-fade-in-up">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Integrations</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Connect your tools to give your agents superpowers
        </p>
      </div>

      {/* Connected section */}
      {connected.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" />
            Connected ({connected.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
            {connected.map((c) => (
              <ConnectorCard
                key={c.key}
                connector={c}
                isConnected
                onConnect={() => {}}
                onManage={() => {
                  // Will open manage modal
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Available section */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          Available ({available.length})
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {available.map((c) => (
            <ConnectorCard
              key={c.key}
              connector={c}
              isConnected={false}
              onConnect={() => handleConnect(c)}
            />
          ))}
        </div>
      </div>

      {/* API Key dialog */}
      <ApiKeyConnectDialog
        connector={apiKeyDialogConnector}
        open={!!apiKeyDialogConnector}
        onClose={() => setApiKeyDialogConnector(null)}
        onConnect={handleApiKeyConnect}
      />
    </div>
  );
}
