"use client";

import { AgentAvatar } from "@/components/agents/AgentAvatar";

interface AgentTypingProps {
  agentName: string;
  agentColor: string;
}

export function AgentTyping({ agentName, agentColor }: AgentTypingProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0">
        <AgentAvatar
          name={agentName}
          accentColor={agentColor}
          size="sm"
        />
      </div>
      <div className="rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3">
        <div className="flex items-center gap-1">
          <span
            className="inline-block h-2 w-2 animate-bounce rounded-full bg-slate-400"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="inline-block h-2 w-2 animate-bounce rounded-full bg-slate-400"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="inline-block h-2 w-2 animate-bounce rounded-full bg-slate-400"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
