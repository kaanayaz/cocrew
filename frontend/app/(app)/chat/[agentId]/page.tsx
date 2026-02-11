"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ChatThread } from "@/components/chat/ChatThread";
import { ChatInput } from "@/components/chat/ChatInput";
import { ContextPanel } from "@/components/chat/ContextPanel";
import { AgentAvatar } from "@/components/agents/AgentAvatar";
import { useChatStore } from "@/stores/chatStore";
import { AGENTS } from "@/lib/constants";
import { PanelRightOpen, PanelRightClose, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

// Map URL slug to agent key
function getAgentKeyFromSlug(slug: string): string | null {
  for (const [key, agent] of Object.entries(AGENTS)) {
    if (agent.slug === slug) return key;
  }
  return null;
}

// Extract text content from UIMessage parts
function getMessageText(msg: { parts?: Array<{ type: string; text?: string }>, content?: string }): string {
  if (msg.parts) {
    return msg.parts
      .filter((p) => p.type === "text" && p.text)
      .map((p) => p.text)
      .join("");
  }
  return msg.content ?? "";
}

export default function ChatPage() {
  const params = useParams<{ agentId: string }>();
  const agentSlug = params.agentId;
  const agentKey = getAgentKeyFromSlug(agentSlug);
  const agent = agentKey ? AGENTS[agentKey as keyof typeof AGENTS] : null;
  const [showContext, setShowContext] = useState(false);

  // Show context panel by default on large screens
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setShowContext(mq.matches);
  }, []);

  const { setMessages, setIsStreaming } = useChatStore();

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { agentSlug },
    }),
  });

  const isBusy = status === "streaming" || status === "submitted";

  // Sync AI SDK messages to our store for ChatThread
  useEffect(() => {
    setMessages(
      messages.map((m) => ({
        id: m.id,
        role: m.role as "user" | "assistant",
        content: getMessageText(m as any),
        createdAt: new Date().toISOString(),
      }))
    );
  }, [messages, setMessages]);

  useEffect(() => {
    setIsStreaming(isBusy);
  }, [isBusy, setIsStreaming]);

  const handleSend = useCallback(
    (message: string) => {
      sendMessage({ text: message });
    },
    [sendMessage]
  );

  if (!agent) {
    return (
      <div className="flex h-[calc(100vh-56px)] items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 animate-fade-in-up">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <Bot className="h-7 w-7 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Agent not found</h3>
          <p className="text-sm text-text-secondary">This agent doesn&apos;t exist or hasn&apos;t been activated yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-56px-64px)] md:h-[calc(100vh-56px)]">
      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        {/* Agent header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <AgentAvatar
              name={agent.name}
              accentColor={agent.accentColor}
              size="md"
              showStatus
              isOnline
            />
            <div>
              <h2 className="text-sm font-semibold text-text-primary">
                {agent.name}
              </h2>
              <p
                className="text-xs"
                style={{ color: agent.accentColor }}
              >
                {agent.role}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowContext(!showContext)}
          >
            {showContext ? (
              <PanelRightClose className="h-4 w-4" />
            ) : (
              <PanelRightOpen className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Messages */}
        <ChatThread agentName={agent.name} agentColor={agent.accentColor} />

        {/* Input */}
        <div className="border-t border-border bg-white p-4">
          <div className="mx-auto max-w-2xl">
            <ChatInput
              onSend={handleSend}
              disabled={isBusy}
              placeholder={`Message ${agent.name}...`}
            />
          </div>
        </div>
      </div>

      {/* Context panel */}
      {showContext && agentKey && (
        <ContextPanel
          agentKey={agentKey}
          onClose={() => setShowContext(false)}
        />
      )}
    </div>
  );
}
