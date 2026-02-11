"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ListTodo,
  Plug,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AgentAvatar } from "@/components/agents/AgentAvatar";
import { AGENTS } from "@/lib/constants";

const agentList = Object.values(AGENTS);

const navItems = [
  { href: "/home", label: "Home", icon: Home },
];

const workspaceItems = [
  { href: "/tasks", label: "Tasks", icon: ListTodo },
  { href: "/integrations", label: "Integrations", icon: Plug },
];

interface AppSidebarProps {
  userName?: string;
  userCredits?: number;
}

export function AppSidebar({ userName, userCredits }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[260px] flex-col bg-sidebar-bg text-sidebar-text md:flex">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="text-xl font-bold text-white">
          cocrew
          <span className="ml-0.5 rounded bg-indigo px-1.5 py-0.5 text-xs font-semibold text-white">
            ai
          </span>
        </span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {/* Home */}
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-active text-white"
                  : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}

        {/* Your Team section */}
        <div className="pt-6">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-muted">
            Your Team
          </p>
          <div className="space-y-0.5">
            {agentList.map((agent) => {
              const href = `/chat/${agent.slug}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={agent.slug}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-active text-white"
                      : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"
                  )}
                  style={
                    isActive
                      ? {
                          borderLeft: `2px solid ${agent.accentColor}`,
                          paddingLeft: "10px",
                        }
                      : undefined
                  }
                >
                  <AgentAvatar
                    name={agent.name}
                    accentColor={agent.accentColor}
                    size="sm"
                    showStatus
                    isOnline
                  />
                  <span className="font-medium">{agent.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Workspace section */}
        <div className="pt-6">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-muted">
            Workspace
          </p>
          {workspaceItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-active text-white"
                    : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-slate-700 px-3 py-4">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            pathname.startsWith("/settings")
              ? "bg-sidebar-active text-white"
              : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"
          )}
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
        <div className="mt-3 flex items-center gap-3 px-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo text-xs font-semibold text-white">
            {userName?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {userName ?? "User"}
            </p>
            <p className="text-xs text-sidebar-muted">Free plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
