"use client";

import { cn } from "@/lib/utils";
import { AgentAvatar } from "@/components/agents/AgentAvatar";
import { Check } from "lucide-react";
import { AGENTS, CONNECTORS } from "@/lib/constants";

const agentList = Object.entries(AGENTS).map(([key, agent]) => ({
  ...agent,
  key,
}));

interface TeamPickerProps {
  selectedAgents: string[];
  onToggle: (agentKey: string) => void;
}

export function TeamPicker({ selectedAgents, onToggle }: TeamPickerProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-text-primary">
          Meet Your Team
        </h2>
        <p className="mt-2 text-text-secondary">
          Choose the AI agents you want on your team. You can always change this
          later.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agentList.map((agent) => {
          const isSelected = selectedAgents.includes(agent.key);
          return (
            <button
              key={agent.key}
              onClick={() => onToggle(agent.key)}
              className={cn(
                "group relative rounded-xl border-2 p-5 text-left transition-all hover:shadow-md",
                isSelected
                  ? "border-indigo bg-indigo/5 shadow-sm"
                  : "border-border bg-white hover:border-slate-300"
              )}
            >
              {/* Selection indicator */}
              <div
                className={cn(
                  "absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full transition-colors",
                  isSelected
                    ? "bg-indigo text-white"
                    : "border-2 border-slate-200 bg-white"
                )}
              >
                {isSelected && <Check className="h-3.5 w-3.5" />}
              </div>

              <div className="mb-3">
                <AgentAvatar
                  name={agent.name}
                  accentColor={agent.accentColor}
                  size="lg"
                />
              </div>

              <h3 className="text-base font-semibold text-text-primary">
                {agent.name}
              </h3>
              <p
                className="text-sm font-medium"
                style={{ color: agent.accentColor }}
              >
                {agent.role}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {agent.description}
              </p>

              {/* Connector badges */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {agent.connectors.map((slug) => {
                  const conn =
                    CONNECTORS[slug as keyof typeof CONNECTORS];
                  if (!conn) return null;
                  return (
                    <span
                      key={slug}
                      className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-text-secondary"
                    >
                      {conn.name}
                    </span>
                  );
                })}
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-sm text-text-muted">
        {selectedAgents.length} of {agentList.length} agents selected
      </p>
    </div>
  );
}
