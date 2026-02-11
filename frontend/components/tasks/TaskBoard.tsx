"use client";

import { TaskColumn } from "./TaskColumn";
import type { TaskItem, TaskStatus } from "@/stores/taskStore";

interface TaskBoardProps {
  tasks: TaskItem[];
  onTaskClick?: (task: TaskItem) => void;
}

const COLUMNS: { title: string; status: TaskStatus }[] = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in_progress" },
  { title: "Done", status: "done" },
];

export function TaskBoard({ tasks, onTaskClick }: TaskBoardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {COLUMNS.map((col) => (
        <TaskColumn
          key={col.status}
          title={col.title}
          status={col.status}
          tasks={tasks.filter((t) => t.status === col.status)}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  );
}
