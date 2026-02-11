"use client";

import { usePathname, useRouter } from "next/navigation";
import { Coins, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AGENTS } from "@/lib/constants";

interface HeaderProps {
  userName?: string;
  userCredits?: number;
}

function getBreadcrumb(pathname: string): string {
  if (pathname === "/home") return "Home";
  if (pathname === "/tasks") return "Tasks";
  if (pathname === "/integrations") return "Integrations";
  if (pathname === "/settings") return "Settings";
  if (pathname === "/settings/billing") return "Settings / Billing";
  if (pathname === "/onboarding") return "Onboarding";

  // Agent chat pages
  const agentMatch = pathname.match(/^\/chat\/(.+)$/);
  if (agentMatch) {
    const agentSlug = agentMatch[1];
    const agent = Object.values(AGENTS).find((a) => a.slug === agentSlug);
    if (agent) return `Chat with ${agent.name}`;
    return "Chat";
  }

  return "";
}

export function Header({ userName, userCredits = 0 }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-white px-6">
      {/* Breadcrumb */}
      <h2 className="text-sm font-medium text-text-secondary">
        {getBreadcrumb(pathname)}
      </h2>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Credit balance pill */}
        <button
          onClick={() => router.push("/settings/billing")}
          className="flex items-center gap-1.5 rounded-full bg-indigo px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-hover"
        >
          <Coins className="h-3.5 w-3.5" />
          {userCredits} credits
        </button>

        {/* User avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-300">
              {userName?.[0]?.toUpperCase() ?? "U"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings/billing")}>
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
