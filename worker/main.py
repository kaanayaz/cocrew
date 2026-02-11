"""
cocrew.ai — Python Worker
FastAPI service for AI agent execution with tool routing.
"""

import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="cocrew.ai Worker", version="0.1.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ExecuteTaskRequest(BaseModel):
    task_id: str
    agent_slug: str
    user_id: str
    prompt: str
    connected_tools: list[str] = []


class ExecuteTaskResponse(BaseModel):
    task_id: str
    status: str
    result: str | None = None
    tools_used: list[str] = []
    credits_used: int = 0


@app.get("/health")
async def health():
    return {"status": "ok", "service": "cocrew-worker"}


@app.post("/execute", response_model=ExecuteTaskResponse)
async def execute_task(request: ExecuteTaskRequest):
    """Execute an agent task with tool access."""
    from executor import execute_agent_task

    try:
        result = await execute_agent_task(
            task_id=request.task_id,
            agent_slug=request.agent_slug,
            user_id=request.user_id,
            prompt=request.prompt,
            connected_tools=request.connected_tools,
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
