"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreditCard, User, Bell, AlertTriangle } from "lucide-react";

const TABS = [
  { id: "account", label: "Account", icon: User },
  { id: "billing", label: "Billing", icon: CreditCard, href: "/settings/billing" },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function SettingsPage() {
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await (supabase.from("profiles") as any)
        .update({ full_name: fullName })
        .eq("id", user.id);
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="p-6 animate-fade-in-up">
      <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Manage your account and preferences
      </p>

      {/* Tab navigation */}
      <div className="mt-6 flex gap-1 border-b border-border">
        {TABS.map((tab) =>
          tab.href ? (
            <Link
              key={tab.id}
              href={tab.href}
              className="flex items-center gap-2 border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Link>
          ) : (
            <button
              key={tab.id}
              className={
                tab.id === "account"
                  ? "flex items-center gap-2 border-b-2 border-indigo px-4 py-2.5 text-sm font-medium text-indigo"
                  : "flex items-center gap-2 border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              }
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        )}
      </div>

      {/* Account section */}
      <div className="mt-6 max-w-lg space-y-6">
        {/* Profile */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input disabled placeholder="your@email.com" />
            <p className="text-xs text-text-muted">
              Email cannot be changed
            </p>
          </div>

          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : saved ? "Saved!" : "Save changes"}
          </Button>
        </form>

        <Separator />

        {/* Sign out */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Session</h3>
          <Button
            variant="outline"
            className="mt-2"
            onClick={handleLogout}
          >
            Sign out
          </Button>
        </div>

        <Separator />

        {/* Danger zone */}
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <h3 className="text-sm font-semibold text-red-600">
              Danger zone
            </h3>
          </div>
          <p className="mt-1 text-sm text-red-600/80">
            Permanently delete your account and all associated data.
          </p>
          <Button variant="destructive" size="sm" className="mt-3" disabled>
            Delete account
          </Button>
        </div>
      </div>
    </div>
  );
}
