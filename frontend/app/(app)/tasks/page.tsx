"use client";

import { useState } from "react";
import { TaskBoard } from "@/components/tasks/TaskBoard";
import { TaskDetail } from "@/components/tasks/TaskDetail";
import { useTaskStore, type TaskItem } from "@/stores/taskStore";
import { AGENTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

// Mock tasks for demo — will be replaced with real data from Supabase
const DEMO_TASKS: TaskItem[] = [
  {
    id: "1",
    title: "Rewrite summer collection product descriptions",
    description:
      "Update all product descriptions in the Summer '25 collection with SEO-optimized copy.",
    status: "done",
    agentName: "Maya",
    agentColor: AGENTS.maya.accentColor,
    creditsUsed: 3,
    connectors: ["Shopify"],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "2",
    title: "Audit homepage meta tags",
    description: "Review and optimize meta title, description, and OG tags for the storefront homepage.",
    status: "in_progress",
    agentName: "Leo",
    agentColor: AGENTS.leo.accentColor,
    creditsUsed: null,
    connectors: ["Shopify", "Google Analytics"],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    title: "Create Instagram ad campaign for new arrivals",
    description: null,
    status: "todo",
    agentName: "Ava",
    agentColor: AGENTS.ava.accentColor,
    creditsUsed: null,
    connectors: ["Meta Ads", "Canva"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Generate weekly analytics report",
    description: "Compile key metrics from Shopify and GA4 into a summary report.",
    status: "todo",
    agentName: "Sam",
    agentColor: AGENTS.sam.accentColor,
    creditsUsed: null,
    connectors: ["Shopify", "Google Analytics"],
    createdAt: new Date().toISOString(),
  },
];

export default function TasksPage() {
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const tasks = useTaskStore((s) =>
    s.tasks.length > 0 ? s.tasks : DEMO_TASKS
  );

  return (
    <div className="p-6 animate-fade-in-up">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Tasks</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Track work your agents are doing
          </p>
        </div>
      </div>

      {/* Board */}
      {tasks.length > 0 ? (
        <TaskBoard tasks={tasks} onTaskClick={setSelectedTask} />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-20">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <MessageSquare className="h-6 w-6 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">
            Your board is empty
          </h3>
          <p className="mt-1 text-sm text-text-secondary">
            Chat with an agent to create your first task.
          </p>
          <Link href={`/chat/${AGENTS.maya.slug}`}>
            <Button className="mt-4">Chat with Maya</Button>
          </Link>
        </div>
      )}

      {/* Task detail slide-over */}
      <TaskDetail
        task={selectedTask}
        open={!!selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
}
