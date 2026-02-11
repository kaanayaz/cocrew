import { createClient } from "@/lib/supabase/server";
import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export const maxDuration = 60;

export async function POST(request: Request) {
  const { messages, agentSlug } = await request.json();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Get agent system prompt from database
  let systemPrompt =
    "You are a helpful AI assistant for Shopify store owners.";

  const { data: agent } = (await supabase
    .from("agents")
    .select("system_prompt, name, role")
    .eq("slug", agentSlug)
    .single()) as {
    data: { system_prompt: string; name: string; role: string } | null;
  };

  if (agent?.system_prompt) {
    systemPrompt = agent.system_prompt;
  }

  const result = streamText({
    model: anthropic("claude-sonnet-4-5-20250514"),
    system: systemPrompt,
    messages,
  });

  return result.toUIMessageStreamResponse();
}
