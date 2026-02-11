"use client";

import { cn } from "@/lib/utils";

interface AgentAvatarProps {
  name: string;
  accentColor: string;
  avatarUrl?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  showStatus?: boolean;
  isOnline?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-12 w-12 text-sm",
  xl: "h-16 w-16 text-lg",
};

const ringMap = {
  sm: "ring-[1.5px]",
  md: "ring-2",
  lg: "ring-2",
  xl: "ring-[3px]",
};

const statusDotMap = {
  sm: "h-1.5 w-1.5 -bottom-0 -right-0",
  md: "h-2 w-2 -bottom-0.5 -right-0.5",
  lg: "h-2.5 w-2.5 bottom-0 right-0",
  xl: "h-3 w-3 bottom-0.5 right-0.5",
};

export function AgentAvatar({
  name,
  accentColor,
  avatarUrl,
  size = "md",
  showStatus = false,
  isOnline = true,
  className,
}: AgentAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-full font-semibold text-white",
          ringMap[size],
          sizeMap[size]
        )}
        style={{
          backgroundColor: accentColor,
          boxShadow: `0 0 0 2px white, 0 0 0 ${size === "sm" ? "3.5px" : "4px"} ${accentColor}`,
        }}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>
      {showStatus && (
        <span
          className={cn(
            "absolute block rounded-full border-2 border-white",
            statusDotMap[size],
            isOnline ? "bg-success" : "bg-text-muted"
          )}
        />
      )}
    </div>
  );
}
