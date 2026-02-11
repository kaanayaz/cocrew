"use client";

import { cn } from "@/lib/utils";
import { AgentAvatar } from "@/components/agents/AgentAvatar";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";
import type { TaskItem } from "@/stores/taskStore";

interface TaskCardProps {
  task: TaskItem;
  onClick?: () => void;
}

const statusColors: Record<string, string> = {
  todo: "bg-slate-400",
  in_progress: "bg-amber-400",
  done: "bg-emerald-400",
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg border border-border bg-white p-4 text-left shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Status dot + title */}
      <div className="flex items-start gap-2">
        <div
          className={cn(
            "mt-1.5 h-2 w-2 shrink-0 rounded-full",
            statusColors[task.status]
          )}
        />
        <h3 className="text-sm font-medium text-text-primary line-clamp-2">
          {task.title}
        </h3>
      </div>

      {/* Description */}
      {task.description && (
        <p className="mt-2 text-xs text-text-secondary line-clamp-2 pl-4">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between pl-4">
        <div className="flex items-center gap-2">
          <AgentAvatar
            name={task.agentName}
            accentColor={task.agentColor}
            size="sm"
          />
          <span className="text-xs text-text-secondary">{task.agentName}</span>
        </div>

        <div className="flex items-center gap-2">
          {task.creditsUsed != null && (
            <span className="flex items-center gap-0.5 text-xs text-text-muted">
              <Coins className="h-3 w-3" />
              {task.creditsUsed}
            </span>
          )}
        </div>
      </div>

      {/* Connector badges */}
      {task.connectors.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1 pl-4">
          {task.connectors.map((c) => (
            <Badge
              key={c}
              variant="secondary"
              className="text-[10px] font-normal"
            >
              {c}
            </Badge>
          ))}
        </div>
      )}
    </button>
  );
}
