# cocrew.ai

## Project Overview
SaaS platform where Shopify store owners chat with AI agents to automate store operations.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui
- **State**: Zustand (local) + React Query (server)
- **AI**: Vercel AI SDK + Anthropic Claude
- **Database**: Supabase (Postgres + Auth + Realtime)
- **Worker**: Python FastAPI + LiteLLM
- **Payments**: Stripe
- **Task Queue**: Inngest

## Project Structure
- `frontend/` — Next.js app (routes, components, API)
- `worker/` — Python FastAPI worker for AI agent execution
- `supabase/` — Database migrations and seed data

## Key Commands
- `cd frontend && npm run dev` — Start dev server
- `cd frontend && npm run build` — Production build
- `cd worker && uvicorn main:app --reload` — Start worker

## Design System
- Dark sidebar (#0F172A), light content (#FFFFFF)
- Primary: Indigo-500 (#6366F1)
- Fonts: DM Sans (UI) + JetBrains Mono (data)
- Icons: Lucide
- Agent colors: Maya=#8B5CF6, Leo=#3B82F6, Ava=#EC4899, Sam=#10B981, Nina=#F59E0B

## Node Version
Requires Node 20+. Use `nvm use 20` before running commands.
