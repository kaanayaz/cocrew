import { create } from "zustand";

export type TaskStatus = "todo" | "in_progress" | "done";

export interface TaskItem {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  agentName: string;
  agentColor: string;
  creditsUsed: number | null;
  connectors: string[];
  createdAt: string;
}

interface TaskState {
  tasks: TaskItem[];
  filter: {
    agent: string | null;
    status: TaskStatus | null;
  };
  setTasks: (tasks: TaskItem[]) => void;
  setFilter: (filter: Partial<TaskState["filter"]>) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  filter: { agent: null, status: null },

  setTasks: (tasks) => set({ tasks }),
  setFilter: (filter) =>
    set((state) => ({ filter: { ...state.filter, ...filter } })),
}));
