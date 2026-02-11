"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { AgentAvatar } from "@/components/agents/AgentAvatar";
import { Coins, Clock, Plug } from "lucide-react";
import type { TaskItem } from "@/stores/taskStore";

interface TaskDetailProps {
  task: TaskItem | null;
  open: boolean;
  onClose: () => void;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  todo: { label: "To Do", color: "bg-slate-100 text-slate-700" },
  in_progress: {
    label: "In Progress",
    color: "bg-amber-100 text-amber-700",
  },
  done: { label: "Done", color: "bg-emerald-100 text-emerald-700" },
};

export function TaskDetail({ task, open, onClose }: TaskDetailProps) {
  if (!task) return null;

  const status = statusLabels[task.status];

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-[400px] sm:max-w-[400px]">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Badge className={status.color} variant="secondary">
              {status.label}
            </Badge>
          </div>
          <SheetTitle className="text-lg">{task.title}</SheetTitle>
          {task.description && (
            <SheetDescription>{task.description}</SheetDescription>
          )}
        </SheetHeader>

        <div className="mt-6 space-y-5">
          {/* Agent */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Assigned Agent
            </p>
            <div className="flex items-center gap-2">
              <AgentAvatar
                name={task.agentName}
                accentColor={task.agentColor}
                size="sm"
              />
              <span className="text-sm font-medium text-text-primary">
                {task.agentName}
              </span>
            </div>
          </div>

          {/* Credits */}
          {task.creditsUsed != null && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                Credits Used
              </p>
              <div className="flex items-center gap-1.5 text-sm text-text-primary">
                <Coins className="h-4 w-4 text-indigo" />
                {task.creditsUsed} credits
              </div>
            </div>
          )}

          {/* Connectors */}
          {task.connectors.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                Tools Used
              </p>
              <div className="flex flex-wrap gap-1.5">
                {task.connectors.map((c) => (
                  <Badge key={c} variant="outline" className="gap-1 text-xs">
                    <Plug className="h-3 w-3" />
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Created */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Created
            </p>
            <div className="flex items-center gap-1.5 text-sm text-text-secondary">
              <Clock className="h-4 w-4" />
              {new Date(task.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
