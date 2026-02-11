"use client";

import { AGENTS, CONNECTORS } from "@/lib/constants";
import { AgentAvatar } from "@/components/agents/AgentAvatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plug, Brain, Zap, X } from "lucide-react";

interface ContextPanelProps {
  agentKey: string;
  onClose?: () => void;
}

export function ContextPanel({ agentKey, onClose }: ContextPanelProps) {
  const agent = AGENTS[agentKey as keyof typeof AGENTS];
  if (!agent) return null;

  return (
    <>
      {/* Mobile overlay backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 lg:hidden"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="fixed right-0 top-0 z-50 h-full w-[300px] shrink-0 border-l border-border bg-white p-5 shadow-lg animate-slide-in-right lg:static lg:z-auto lg:w-[320px] lg:shadow-none">
        {/* Mobile close button */}
        <div className="mb-4 flex justify-end lg:hidden">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Agent Info */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Agent
            </h3>
            <div className="flex items-center gap-3">
              <AgentAvatar
                name={agent.name}
                accentColor={agent.accentColor}
                size="md"
                showStatus
                isOnline
              />
              <div>
                <p className="font-semibold text-text-primary">{agent.name}</p>
                <p
                  className="text-sm"
                  style={{ color: agent.accentColor }}
                >
                  {agent.role}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {agent.description}
            </p>
          </div>

          {/* Model Info */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Model
            </h3>
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
              <Brain className="h-4 w-4 text-text-secondary" />
              <span className="text-sm text-text-primary">Claude Sonnet</span>
            </div>
          </div>

          {/* Connected Tools */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Tools
            </h3>
            <div className="space-y-2">
              {agent.connectors.map((slug) => {
                const conn =
                  CONNECTORS[slug as keyof typeof CONNECTORS];
                if (!conn) return null;
                return (
                  <div
                    key={slug}
                    className="flex items-center gap-2 rounded-lg border border-border px-3 py-2"
                  >
                    <Plug
                      className="h-4 w-4"
                      style={{ color: conn.brandColor }}
                    />
                    <span className="flex-1 text-sm text-text-primary">
                      {conn.name}
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-[10px]"
                    >
                      Not connected
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Capabilities
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="outline" className="gap-1 text-xs">
                <Zap className="h-3 w-3" />
                Chat
              </Badge>
              <Badge variant="outline" className="gap-1 text-xs">
                <Zap className="h-3 w-3" />
                Task creation
              </Badge>
              <Badge variant="outline" className="gap-1 text-xs">
                <Zap className="h-3 w-3" />
                Content generation
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
