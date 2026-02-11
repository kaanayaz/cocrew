"""
Agent execution engine.
Uses LiteLLM for model routing and the tool router for dynamic tool loading.
"""

import os
import json
from litellm import acompletion
from tool_router import get_tools_for_agent
from supabase_client import get_supabase


async def execute_agent_task(
    task_id: str,
    agent_slug: str,
    user_id: str,
    prompt: str,
    connected_tools: list[str],
) -> dict:
    """Execute a task using the appropriate agent and tools."""

    supabase = get_supabase()

    # Get agent system prompt
    agent_result = supabase.table("agents").select("system_prompt, name").eq("slug", agent_slug).single().execute()
    agent = agent_result.data
    system_prompt = agent["system_prompt"] if agent else "You are a helpful AI assistant."

    # Update task status to in_progress
    supabase.table("tasks").update({"status": "in_progress"}).eq("id", task_id).execute()

    # Get available tools based on user's connections
    tools = get_tools_for_agent(agent_slug, connected_tools)
    tool_definitions = [t["definition"] for t in tools]
    tool_functions = {t["definition"]["function"]["name"]: t["handler"] for t in tools}

    # Build messages
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": prompt},
    ]

    # LLM call with tool use loop
    model = os.getenv("LLM_MODEL", "anthropic/claude-sonnet-4-5-20250514")
    tools_used = []
    max_iterations = 10
    iteration = 0

    while iteration < max_iterations:
        iteration += 1

        kwargs = {
            "model": model,
            "messages": messages,
        }
        if tool_definitions:
            kwargs["tools"] = tool_definitions

        response = await acompletion(**kwargs)
        choice = response.choices[0]

        if choice.finish_reason == "tool_calls" and choice.message.tool_calls:
            # Process tool calls
            messages.append(choice.message.model_dump())

            for tool_call in choice.message.tool_calls:
                fn_name = tool_call.function.name
                fn_args = json.loads(tool_call.function.arguments)

                if fn_name in tool_functions:
                    try:
                        result = await tool_functions[fn_name](**fn_args)
                        tools_used.append(fn_name)
                    except Exception as e:
                        result = f"Error: {str(e)}"

                    messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": json.dumps(result) if not isinstance(result, str) else result,
                    })
                else:
                    messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": f"Error: Unknown tool {fn_name}",
                    })
        else:
            # Final response
            final_content = choice.message.content or ""

            # Calculate credits (1 credit per tool call, minimum 1)
            credits_used = max(1, len(tools_used))

            # Update task
            supabase.table("tasks").update({
                "status": "done",
                "result": final_content,
            }).eq("id", task_id).execute()

            # Deduct credits
            supabase.rpc("deduct_credits_for_task", {
                "p_user_id": user_id,
                "p_task_id": task_id,
                "p_credits": credits_used,
            }).execute()

            # Save assistant message
            supabase.table("messages").insert({
                "agent_instance_id": task_id,  # Will be properly linked in Phase 11
                "role": "assistant",
                "content": final_content,
                "metadata": {"tools_used": tools_used},
            }).execute()

            return {
                "task_id": task_id,
                "status": "done",
                "result": final_content,
                "tools_used": list(set(tools_used)),
                "credits_used": credits_used,
            }

    # Max iterations reached
    return {
        "task_id": task_id,
        "status": "done",
        "result": "Task completed (max iterations reached)",
        "tools_used": list(set(tools_used)),
        "credits_used": max(1, len(tools_used)),
    }
