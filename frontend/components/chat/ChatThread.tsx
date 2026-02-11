"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { AgentTyping } from "./AgentTyping";
import { useChatStore } from "@/stores/chatStore";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatThreadProps {
  agentName: string;
  agentColor: string;
}

export function ChatThread({ agentName, agentColor }: ChatThreadProps) {
  const messages = useChatStore((s) => s.messages);
  const isStreaming = useChatStore((s) => s.isStreaming);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  return (
    <ScrollArea className="flex-1 px-4 py-6">
      <div className="mx-auto max-w-2xl space-y-4">
        {messages.length === 0 && !isStreaming && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white"
              style={{ backgroundColor: agentColor }}
            >
              {agentName[0]}
            </div>
            <h3 className="text-lg font-semibold text-text-primary">
              Chat with {agentName}
            </h3>
            <p className="mt-1 max-w-sm text-sm text-text-secondary">
              Send a message to start working with {agentName}. They can
              help you with tasks related to your Shopify store.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            agentName={agentName}
            agentColor={agentColor}
          />
        ))}

        {isStreaming &&
          (messages.length === 0 ||
            messages[messages.length - 1].role !== "assistant") && (
            <AgentTyping agentName={agentName} agentColor={agentColor} />
          )}

        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
