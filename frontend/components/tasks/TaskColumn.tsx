"use client";

import { cn } from "@/lib/utils";
import { TaskCard } from "./TaskCard";
import type { TaskItem, TaskStatus } from "@/stores/taskStore";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: TaskItem[];
  onTaskClick?: (task: TaskItem) => void;
}

const columnStyles: Record<TaskStatus, { dot: string; bg: string }> = {
  todo: { dot: "bg-slate-400", bg: "bg-slate-50" },
  in_progress: { dot: "bg-amber-400", bg: "bg-amber-50/50" },
  done: { dot: "bg-emerald-400", bg: "bg-emerald-50/50" },
};

export function TaskColumn({
  title,
  status,
  tasks,
  onTaskClick,
}: TaskColumnProps) {
  const style = columnStyles[status];

  return (
    <div className={cn("flex flex-col rounded-xl p-3", style.bg)}>
      {/* Column header */}
      <div className="mb-3 flex items-center gap-2 px-1">
        <div className={cn("h-2.5 w-2.5 rounded-full", style.dot)} />
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-text-secondary shadow-sm">
          {tasks.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-1 flex-col gap-2 stagger-children">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick?.(task)}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-slate-200 py-8">
            <p className="text-xs text-text-muted">No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
}
