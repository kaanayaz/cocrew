-- ============================================
-- cocrew.ai V1 Schema
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ─────────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────────
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  credits INTEGER DEFAULT 50 NOT NULL,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ─────────────────────────────────────────────
-- CONNECTORS (platform-defined, read-only)
-- ─────────────────────────────────────────────
CREATE TABLE connectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  brand_color TEXT DEFAULT '#6366f1',
  auth_type TEXT NOT NULL
    CHECK (auth_type IN ('oauth', 'api_key')),

  -- OAuth config (null for api_key type)
  oauth_authorize_url TEXT,
  oauth_token_url TEXT,
  oauth_scopes TEXT[],

  -- API Key config (null for oauth type)
  api_key_instructions TEXT,
  api_key_fields JSONB,

  -- Metadata
  category TEXT DEFAULT 'other'
    CHECK (category IN ('ecommerce', 'email', 'advertising', 'analytics', 'design', 'other')),
  docs_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- No RLS — connectors are public read-only


-- ─────────────────────────────────────────────
-- USER CONNECTIONS (user ↔ connector link)
-- ─────────────────────────────────────────────
CREATE TABLE user_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  connector_id UUID NOT NULL REFERENCES connectors(id),

  -- Encrypted credential storage
  credentials_encrypted BYTEA NOT NULL,

  -- Connection metadata
  account_label TEXT,
  status TEXT DEFAULT 'active'
    CHECK (status IN ('active', 'expired', 'error', 'revoked')),
  error_message TEXT,

  -- Token refresh tracking (for OAuth connectors)
  token_expires_at TIMESTAMPTZ,
  last_refreshed_at TIMESTAMPTZ,

  -- Usage stats
  last_used_at TIMESTAMPTZ,
  total_uses INTEGER DEFAULT 0,

  connected_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, connector_id)
);

ALTER TABLE user_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "connections_select_own" ON user_connections
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "connections_insert_own" ON user_connections
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "connections_update_own" ON user_connections
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "connections_delete_own" ON user_connections
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_user_connections_user ON user_connections(user_id) WHERE status = 'active';


-- ─────────────────────────────────────────────
-- AGENTS (pre-built, not user-created in V1)
-- ─────────────────────────────────────────────
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  role_title TEXT NOT NULL,
  description TEXT NOT NULL,
  avatar_url TEXT,
  accent_color TEXT DEFAULT '#6366f1',

  -- AI config
  system_prompt TEXT NOT NULL,
  model TEXT DEFAULT 'claude-sonnet-4-20250514',

  -- Connector access
  supported_connectors TEXT[] DEFAULT '{}',

  -- Built-in tools (no connector needed)
  builtin_tools TEXT[] DEFAULT '{}',

  category TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────
-- AGENT ↔ CONNECTOR PERMISSIONS
-- ─────────────────────────────────────────────
CREATE TABLE agent_connector_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  connector_slug TEXT NOT NULL,

  permissions TEXT[] NOT NULL DEFAULT '{}',
  description TEXT,

  UNIQUE(agent_id, connector_slug)
);


-- ─────────────────────────────────────────────
-- AGENT INSTANCES (user's hired agents)
-- ─────────────────────────────────────────────
CREATE TABLE agent_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  custom_name TEXT,
  hired_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,

  UNIQUE(agent_id, user_id)
);

ALTER TABLE agent_instances ENABLE ROW LEVEL SECURITY;

CREATE POLICY "agent_instances_select_own" ON agent_instances
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "agent_instances_insert_own" ON agent_instances
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "agent_instances_update_own" ON agent_instances
  FOR UPDATE USING (auth.uid() = user_id);


-- ─────────────────────────────────────────────
-- TASKS
-- ─────────────────────────────────────────────
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  agent_instance_id UUID NOT NULL REFERENCES agent_instances(id),

  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo'
    CHECK (status IN ('todo', 'in_progress', 'completed', 'failed')),
  priority TEXT DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high')),

  credits_consumed INTEGER DEFAULT 0,
  ai_cost_usd DECIMAL(10,6) DEFAULT 0,

  connectors_used TEXT[] DEFAULT '{}',

  artifacts JSONB DEFAULT '[]',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tasks_select_own" ON tasks
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "tasks_insert_own" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "tasks_update_own" ON tasks
  FOR UPDATE USING (auth.uid() = user_id);


-- ─────────────────────────────────────────────
-- MESSAGES
-- ─────────────────────────────────────────────
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  agent_instance_id UUID NOT NULL REFERENCES agent_instances(id),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,

  metadata JSONB DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "messages_select_own" ON messages
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "messages_insert_own" ON messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_messages_agent_instance ON messages(agent_instance_id, created_at);
CREATE INDEX idx_messages_task ON messages(task_id, created_at);


-- ─────────────────────────────────────────────
-- CREDIT TRANSACTIONS
-- ─────────────────────────────────────────────
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL
    CHECK (type IN ('purchase', 'task_consumption', 'signup_bonus', 'refund')),
  task_id UUID REFERENCES tasks(id),
  stripe_session_id TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "credit_txn_select_own" ON credit_transactions
  FOR SELECT USING (auth.uid() = user_id);


-- ─────────────────────────────────────────────
-- CONNECTOR USAGE LOG
-- ─────────────────────────────────────────────
CREATE TABLE connector_usage_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  connection_id UUID NOT NULL REFERENCES user_connections(id),
  task_id UUID REFERENCES tasks(id),

  action TEXT NOT NULL,
  status TEXT DEFAULT 'success'
    CHECK (status IN ('success', 'error', 'rate_limited')),
  error_message TEXT,
  response_time_ms INTEGER,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_connector_usage_user ON connector_usage_log(user_id, created_at DESC);
CREATE INDEX idx_connector_usage_connection ON connector_usage_log(connection_id, created_at DESC);


-- ─────────────────────────────────────────────
-- ATOMIC CREDIT OPERATIONS
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION deduct_credits_for_task(
  p_user_id UUID,
  p_task_id UUID,
  p_amount INTEGER,
  p_ai_cost DECIMAL,
  p_connectors_used TEXT[]
)
RETURNS BOOLEAN AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  SELECT credits INTO current_credits
  FROM profiles WHERE id = p_user_id FOR UPDATE;

  IF current_credits < p_amount THEN
    RETURN FALSE;
  END IF;

  UPDATE profiles SET credits = credits - p_amount, updated_at = NOW()
  WHERE id = p_user_id;

  UPDATE tasks
  SET credits_consumed = p_amount,
      ai_cost_usd = p_ai_cost,
      connectors_used = p_connectors_used,
      updated_at = NOW()
  WHERE id = p_task_id;

  INSERT INTO credit_transactions (user_id, amount, type, task_id, description)
  VALUES (p_user_id, -p_amount, 'task_consumption', p_task_id,
          'Task execution: ' || p_amount || ' credits');

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION add_credits(
  p_user_id UUID,
  p_amount INTEGER,
  p_stripe_session_id TEXT
)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles SET credits = credits + p_amount, updated_at = NOW()
  WHERE id = p_user_id;

  INSERT INTO credit_transactions (user_id, amount, type, stripe_session_id, description)
  VALUES (p_user_id, p_amount, 'purchase', p_stripe_session_id,
          'Purchased ' || p_amount || ' credits');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ─────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────
CREATE INDEX idx_tasks_user_status ON tasks(user_id, status);
CREATE INDEX idx_tasks_agent ON tasks(agent_instance_id);
CREATE INDEX idx_agent_instances_user ON agent_instances(user_id) WHERE is_active = TRUE;
CREATE INDEX idx_credit_txn_user ON credit_transactions(user_id, created_at DESC);


-- ─────────────────────────────────────────────
-- TRIGGERS
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW(); RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_tasks_updated BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_connections_updated BEFORE UPDATE ON user_connections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ─────────────────────────────────────────────
-- REALTIME
-- ─────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE user_connections;
