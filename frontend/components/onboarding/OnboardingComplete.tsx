"use client";

import { AgentAvatar } from "@/components/agents/AgentAvatar";
import { AGENTS } from "@/lib/constants";
import { Sparkles } from "lucide-react";

interface OnboardingCompleteProps {
  selectedAgents: string[];
}

export function OnboardingComplete({
  selectedAgents,
}: OnboardingCompleteProps) {
  const agents = selectedAgents
    .map((key) => AGENTS[key as keyof typeof AGENTS])
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-lg text-center">
      {/* Celebration icon */}
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo/10">
        <Sparkles className="h-8 w-8 text-indigo" />
      </div>

      <h2 className="text-2xl font-bold text-text-primary">
        You&apos;re all set!
      </h2>
      <p className="mt-2 text-text-secondary">
        Your AI team is ready to help you grow your Shopify store. Start a
        conversation with any agent to get going.
      </p>

      {/* Team composition */}
      <div className="mt-8 rounded-xl border border-border bg-white p-6">
        <p className="mb-4 text-sm font-medium text-text-secondary">
          Your Team
        </p>
        <div className="flex items-center justify-center gap-3">
          {agents.map((agent) => (
            <div key={agent.slug} className="flex flex-col items-center gap-1.5">
              <AgentAvatar
                name={agent.name}
                accentColor={agent.accentColor}
                size="lg"
              />
              <span className="text-xs font-medium text-text-primary">
                {agent.name}
              </span>
              <span
                className="text-[11px]"
                style={{ color: agent.accentColor }}
              >
                {agent.role}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg bg-slate-50 p-3">
          <p className="text-sm text-text-secondary">
            <span className="font-medium text-text-primary">50 credits</span>{" "}
            have been added to your account to get started.
          </p>
        </div>
      </div>
    </div>
  );
}
