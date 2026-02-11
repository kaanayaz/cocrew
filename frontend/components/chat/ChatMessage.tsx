"use client";

import { cn } from "@/lib/utils";
import { AgentAvatar } from "@/components/agents/AgentAvatar";
import { Badge } from "@/components/ui/badge";
import type { ChatMessage as ChatMessageType } from "@/stores/chatStore";

interface ChatMessageProps {
  message: ChatMessageType;
  agentName: string;
  agentColor: string;
}

export function ChatMessage({
  message,
  agentName,
  agentColor,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-message-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0">
          <AgentAvatar
            name={agentName}
            accentColor={agentColor}
            size="sm"
          />
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-indigo text-white rounded-br-md"
            : "bg-slate-100 text-text-primary rounded-bl-md"
        )}
      >
        {/* Render message content with basic markdown-like line breaks */}
        <div className="whitespace-pre-wrap">{message.content}</div>

        {/* Tool usage badges */}
        {message.toolsUsed && message.toolsUsed.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {message.toolsUsed.map((tool) => (
              <Badge
                key={tool}
                variant="secondary"
                className="text-[10px] font-normal"
              >
                Used: {tool}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
