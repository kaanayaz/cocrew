import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, credits, onboarding_completed")
    .eq("id", user.id)
    .single() as { data: { full_name: string | null; credits: number; onboarding_completed: boolean } | null };

  return (
    <div className="flex min-h-screen">
      <AppSidebar
        userName={profile?.full_name ?? user.email ?? undefined}
        userCredits={profile?.credits ?? 0}
      />
      <div className="md:ml-[260px] flex flex-1 flex-col">
        <Header
          userName={profile?.full_name ?? user.email ?? undefined}
          userCredits={profile?.credits ?? 0}
        />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
