"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/onboarding/StepIndicator";
import { TeamPicker } from "@/components/onboarding/TeamPicker";
import { ConnectorPicker } from "@/components/onboarding/ConnectorPicker";
import { OnboardingComplete } from "@/components/onboarding/OnboardingComplete";
import { AGENTS } from "@/lib/constants";
import { ArrowLeft, ArrowRight, Rocket } from "lucide-react";

const STEP_LABELS = ["Your Team", "Connect Tools", "Ready!"];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedAgents, setSelectedAgents] = useState<string[]>(
    Object.keys(AGENTS)
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  function toggleAgent(key: string) {
    setSelectedAgents((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  }

  async function handleComplete() {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Create agent instances for selected agents
      const { data: agents } = await supabase
        .from("agents")
        .select("id, slug") as { data: { id: string; slug: string }[] | null };

      if (agents) {
        const selectedSlugs: string[] = selectedAgents
          .map((key) => AGENTS[key as keyof typeof AGENTS]?.slug)
          .filter(Boolean);

        const instancesToInsert = agents
          .filter((a) => selectedSlugs.includes(a.slug))
          .map((a) => ({
            user_id: user.id,
            agent_id: a.id,
            is_active: true,
          }));

        if (instancesToInsert.length > 0) {
          await (supabase.from("agent_instances") as any).insert(instancesToInsert);
        }
      }

      // Mark onboarding as completed
      await (supabase.from("profiles") as any)
        .update({ onboarding_completed: true })
        .eq("id", user.id);

      router.push("/home");
      router.refresh();
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-50/50 px-4 py-8">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          cocrew
          <span className="ml-0.5 rounded bg-indigo px-1.5 py-0.5 text-xs font-semibold text-white">
            ai
          </span>
        </h1>
      </div>

      {/* Step indicator */}
      <div className="mb-10">
        <StepIndicator
          currentStep={step}
          totalSteps={3}
          labels={STEP_LABELS}
        />
      </div>

      {/* Step content */}
      <div className="w-full max-w-4xl flex-1">
        {step === 1 && (
          <TeamPicker
            selectedAgents={selectedAgents}
            onToggle={toggleAgent}
          />
        )}
        {step === 2 && <ConnectorPicker />}
        {step === 3 && (
          <OnboardingComplete selectedAgents={selectedAgents} />
        )}
      </div>

      {/* Navigation buttons */}
      <div className="mt-10 flex w-full max-w-4xl items-center justify-between">
        <div>
          {step > 1 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {step === 2 && (
            <Button
              variant="ghost"
              className="text-text-secondary"
              onClick={() => setStep(3)}
            >
              Skip
            </Button>
          )}

          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && selectedAgents.length === 0}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete} disabled={loading}>
              {loading ? (
                "Setting up..."
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4" />
                  Start chatting
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
