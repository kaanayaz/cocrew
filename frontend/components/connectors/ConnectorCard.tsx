"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AgentAvatar } from "@/components/agents/AgentAvatar";
import { Plug, Settings, ExternalLink } from "lucide-react";
import { AGENTS } from "@/lib/constants";
import type { ConnectorConfig } from "@/lib/connectors/registry";

interface ConnectorCardProps {
  connector: ConnectorConfig;
  isConnected: boolean;
  onConnect: () => void;
  onManage?: () => void;
}

// Get agents that use this connector
function getAgentsForConnector(slug: string) {
  return Object.values(AGENTS).filter((a) =>
    (a.connectors as readonly string[]).includes(slug)
  );
}

export function ConnectorCard({
  connector,
  isConnected,
  onConnect,
  onManage,
}: ConnectorCardProps) {
  const agents = getAgentsForConnector(connector.slug);

  return (
    <div
      className={cn(
        "rounded-xl border p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        isConnected
          ? "border-emerald-200 bg-white"
          : "border-border bg-white"
      )}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
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
        <div
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            isConnected ? "bg-emerald-400 animate-pulse-dot" : "bg-slate-300"
          )}
        />
      </div>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
        {connector.description}
      </p>

      {/* Agents */}
      <div className="mb-4">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          {isConnected ? "Used by" : "Unlocks for"}
        </p>
        <div className="flex items-center gap-1.5">
          {agents.map((agent) => (
            <AgentAvatar
              key={agent.slug}
              name={agent.name}
              accentColor={agent.accentColor}
              size="sm"
            />
          ))}
        </div>
      </div>

      {/* Action */}
      {isConnected ? (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={onManage}
          >
            <Settings className="mr-1 h-3.5 w-3.5" />
            Manage
          </Button>
        </div>
      ) : (
        <Button
          size="sm"
          className="w-full text-xs"
          onClick={onConnect}
        >
          <ExternalLink className="mr-1 h-3.5 w-3.5" />
          Connect
        </Button>
      )}

      {/* Auth type badge */}
      <div className="mt-3">
        <Badge variant="secondary" className="text-[10px] font-normal">
          {connector.authType === "oauth" ? "OAuth" : "API Key"}
        </Badge>
      </div>
    </div>
  );
}
