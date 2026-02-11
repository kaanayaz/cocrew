"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AGENTS, CONNECTORS } from "@/lib/constants";
import { AgentAvatar } from "@/components/agents/AgentAvatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Coins,
  CheckCircle2,
  Zap,
  Users,
  ArrowRight,
  Plug,
} from "lucide-react";

const agentList = Object.values(AGENTS);
const connectorList = Object.values(CONNECTORS);

// Mock activity items
const ACTIVITIES = [
  {
    id: "1",
    agentName: "Maya",
    agentColor: AGENTS.maya.accentColor,
    action: "Completed task",
    detail: "Rewrote 12 product descriptions for Summer collection",
    connector: "Shopify",
    time: "2 hours ago",
  },
  {
    id: "2",
    agentName: "Leo",
    agentColor: AGENTS.leo.accentColor,
    action: "Started task",
    detail: "Auditing meta tags across 48 pages",
    connector: "Shopify",
    time: "4 hours ago",
  },
  {
    id: "3",
    agentName: "Sam",
    agentColor: AGENTS.sam.accentColor,
    action: "Generated report",
    detail: "Weekly analytics summary for Feb 3-9",
    connector: "Google Analytics",
    time: "Yesterday",
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomePage() {
  const [quickInput, setQuickInput] = useState("");
  const router = useRouter();

  function handleQuickAction(e: React.FormEvent) {
    e.preventDefault();
    if (!quickInput.trim()) return;
    // Route to Maya by default for quick actions
    router.push(`/chat/${AGENTS.maya.slug}`);
  }

  return (
    <div className="p-6 animate-fade-in-up">
      {/* Greeting */}
      <h1 className="text-2xl font-bold text-text-primary">
        {getGreeting()}
      </h1>

      {/* Quick action */}
      <form
        onSubmit={handleQuickAction}
        className="mt-4 flex items-center gap-2"
      >
        <Input
          placeholder="Ask your team anything..."
          value={quickInput}
          onChange={(e) => setQuickInput(e.target.value)}
          className="max-w-lg"
        />
        <Button type="submit" size="icon" disabled={!quickInput.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>

      {/* Connector health */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {connectorList.map((c) => (
          <div key={c.slug} className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="text-xs text-text-muted">{c.name}</span>
          </div>
        ))}
      </div>

      {/* Stats + Credits row */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
        <div className="rounded-xl border border-border bg-white p-4">
          <div className="flex items-center gap-2 text-text-muted">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Tasks completed
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-text-primary">12</p>
          <p className="text-xs text-text-muted">this week</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <div className="flex items-center gap-2 text-text-muted">
            <Coins className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Credits used
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-text-primary">28</p>
          <p className="text-xs text-text-muted">this week</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <div className="flex items-center gap-2 text-text-muted">
            <Users className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Active agents
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-text-primary">5</p>
          <p className="text-xs text-text-muted">of 5</p>
        </div>
        <div className="rounded-xl border border-indigo/20 bg-indigo/5 p-4">
          <div className="flex items-center gap-2 text-indigo">
            <Zap className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Credits
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-indigo">50</p>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-indigo/10">
            <div className="h-full w-full rounded-full bg-indigo" />
          </div>
          <Link
            href="/settings/billing"
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-indigo hover:underline"
          >
            Buy more <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Activity feed */}
      <div className="mt-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
          Recent Activity
        </h2>
        <div className="space-y-3 stagger-children">
          {ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 rounded-lg border border-border bg-white p-4 transition-all duration-200 hover:shadow-sm"
            >
              <AgentAvatar
                name={activity.agentName}
                accentColor={activity.agentColor}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">
                  <span className="font-medium">{activity.agentName}</span>{" "}
                  {activity.action}
                </p>
                <p className="mt-0.5 text-sm text-text-secondary truncate">
                  {activity.detail}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="text-[10px] font-normal"
                  >
                    <Plug className="mr-0.5 h-3 w-3" />
                    {activity.connector}
                  </Badge>
                  <span className="text-xs text-text-muted">
                    {activity.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
