import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get user's agent instances to know which agents they have
  const { data: tasks } = (await supabase
    .from("tasks")
    .select("*, agents(name, slug)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50)) as { data: any[] | null };

  return NextResponse.json({ tasks: tasks ?? [] });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, description, agent_id } = body;

  // Create task in database
  const { data: task, error } = (await (supabase.from("tasks") as any).insert({
    user_id: user.id,
    agent_id,
    title,
    description,
    status: "todo",
  }).select().single()) as { data: any; error: any };

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Optionally dispatch to worker
  const workerUrl = process.env.WORKER_URL;
  if (workerUrl) {
    try {
      await fetch(`${workerUrl}/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.WORKER_AUTH_SECRET}`,
        },
        body: JSON.stringify({
          task_id: task.id,
          agent_slug: body.agent_slug,
          user_id: user.id,
          prompt: `${title}${description ? `: ${description}` : ""}`,
          connected_tools: body.connected_tools ?? [],
        }),
      });
    } catch {
      // Worker not available — task stays as 'todo'
    }
  }

  return NextResponse.json({ task });
}
