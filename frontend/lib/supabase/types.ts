export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          credits: number;
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          credits?: number;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          credits?: number;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      connectors: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string;
          icon_url: string | null;
          brand_color: string;
          auth_type: "oauth" | "api_key";
          oauth_authorize_url: string | null;
          oauth_token_url: string | null;
          oauth_scopes: string[] | null;
          api_key_instructions: string | null;
          api_key_fields: Json | null;
          category: string;
          docs_url: string | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description: string;
          icon_url?: string | null;
          brand_color?: string;
          auth_type: "oauth" | "api_key";
          oauth_authorize_url?: string | null;
          oauth_token_url?: string | null;
          oauth_scopes?: string[] | null;
          api_key_instructions?: string | null;
          api_key_fields?: Json | null;
          category?: string;
          docs_url?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string;
          icon_url?: string | null;
          brand_color?: string;
          auth_type?: "oauth" | "api_key";
          oauth_authorize_url?: string | null;
          oauth_token_url?: string | null;
          oauth_scopes?: string[] | null;
          api_key_instructions?: string | null;
          api_key_fields?: Json | null;
          category?: string;
          docs_url?: string | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      user_connections: {
        Row: {
          id: string;
          user_id: string;
          connector_id: string;
          credentials_encrypted: string;
          account_label: string | null;
          status: "active" | "expired" | "error" | "revoked";
          error_message: string | null;
          token_expires_at: string | null;
          last_refreshed_at: string | null;
          last_used_at: string | null;
          total_uses: number;
          connected_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          connector_id: string;
          credentials_encrypted: string;
          account_label?: string | null;
          status?: "active" | "expired" | "error" | "revoked";
          error_message?: string | null;
          token_expires_at?: string | null;
          last_refreshed_at?: string | null;
          last_used_at?: string | null;
          total_uses?: number;
          connected_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          connector_id?: string;
          credentials_encrypted?: string;
          account_label?: string | null;
          status?: "active" | "expired" | "error" | "revoked";
          error_message?: string | null;
          token_expires_at?: string | null;
          last_refreshed_at?: string | null;
          last_used_at?: string | null;
          total_uses?: number;
          connected_at?: string;
          updated_at?: string;
        };
      };
      agents: {
        Row: {
          id: string;
          name: string;
          slug: string;
          role_title: string;
          description: string;
          avatar_url: string | null;
          accent_color: string;
          system_prompt: string;
          model: string;
          supported_connectors: string[];
          builtin_tools: string[];
          category: string;
          sort_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          role_title: string;
          description: string;
          avatar_url?: string | null;
          accent_color?: string;
          system_prompt: string;
          model?: string;
          supported_connectors?: string[];
          builtin_tools?: string[];
          category: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          role_title?: string;
          description?: string;
          avatar_url?: string | null;
          accent_color?: string;
          system_prompt?: string;
          model?: string;
          supported_connectors?: string[];
          builtin_tools?: string[];
          category?: string;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      agent_connector_permissions: {
        Row: {
          id: string;
          agent_id: string;
          connector_slug: string;
          permissions: string[];
          description: string | null;
        };
        Insert: {
          id?: string;
          agent_id: string;
          connector_slug: string;
          permissions?: string[];
          description?: string | null;
        };
        Update: {
          id?: string;
          agent_id?: string;
          connector_slug?: string;
          permissions?: string[];
          description?: string | null;
        };
      };
      agent_instances: {
        Row: {
          id: string;
          agent_id: string;
          user_id: string;
          custom_name: string | null;
          hired_at: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          agent_id: string;
          user_id: string;
          custom_name?: string | null;
          hired_at?: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          agent_id?: string;
          user_id?: string;
          custom_name?: string | null;
          hired_at?: string;
          is_active?: boolean;
        };
      };
      tasks: {
        Row: {
          id: string;
          user_id: string;
          agent_instance_id: string;
          title: string;
          description: string | null;
          status: "todo" | "in_progress" | "completed" | "failed";
          priority: "low" | "medium" | "high";
          credits_consumed: number;
          ai_cost_usd: number;
          connectors_used: string[];
          artifacts: Json;
          created_at: string;
          started_at: string | null;
          completed_at: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          agent_instance_id: string;
          title: string;
          description?: string | null;
          status?: "todo" | "in_progress" | "completed" | "failed";
          priority?: "low" | "medium" | "high";
          credits_consumed?: number;
          ai_cost_usd?: number;
          connectors_used?: string[];
          artifacts?: Json;
          created_at?: string;
          started_at?: string | null;
          completed_at?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          agent_instance_id?: string;
          title?: string;
          description?: string | null;
          status?: "todo" | "in_progress" | "completed" | "failed";
          priority?: "low" | "medium" | "high";
          credits_consumed?: number;
          ai_cost_usd?: number;
          connectors_used?: string[];
          artifacts?: Json;
          created_at?: string;
          started_at?: string | null;
          completed_at?: string | null;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          task_id: string | null;
          agent_instance_id: string;
          user_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          task_id?: string | null;
          agent_instance_id: string;
          user_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          task_id?: string | null;
          agent_instance_id?: string;
          user_id?: string;
          role?: "user" | "assistant" | "system";
          content?: string;
          metadata?: Json;
          created_at?: string;
        };
      };
      credit_transactions: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          type: "purchase" | "task_consumption" | "signup_bonus" | "refund";
          task_id: string | null;
          stripe_session_id: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          type: "purchase" | "task_consumption" | "signup_bonus" | "refund";
          task_id?: string | null;
          stripe_session_id?: string | null;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          type?: "purchase" | "task_consumption" | "signup_bonus" | "refund";
          task_id?: string | null;
          stripe_session_id?: string | null;
          description?: string | null;
          created_at?: string;
        };
      };
      connector_usage_log: {
        Row: {
          id: string;
          user_id: string;
          connection_id: string;
          task_id: string | null;
          action: string;
          status: "success" | "error" | "rate_limited";
          error_message: string | null;
          response_time_ms: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          connection_id: string;
          task_id?: string | null;
          action: string;
          status?: "success" | "error" | "rate_limited";
          error_message?: string | null;
          response_time_ms?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          connection_id?: string;
          task_id?: string | null;
          action?: string;
          status?: "success" | "error" | "rate_limited";
          error_message?: string | null;
          response_time_ms?: number | null;
          created_at?: string;
        };
      };
    };
    Functions: {
      deduct_credits_for_task: {
        Args: {
          p_user_id: string;
          p_task_id: string;
          p_amount: number;
          p_ai_cost: number;
          p_connectors_used: string[];
        };
        Returns: boolean;
      };
      add_credits: {
        Args: {
          p_user_id: string;
          p_amount: number;
          p_stripe_session_id: string;
        };
        Returns: undefined;
      };
    };
  };
}

// Convenience type aliases
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Connector = Database["public"]["Tables"]["connectors"]["Row"];
export type UserConnection =
  Database["public"]["Tables"]["user_connections"]["Row"];
export type Agent = Database["public"]["Tables"]["agents"]["Row"];
export type AgentInstance =
  Database["public"]["Tables"]["agent_instances"]["Row"];
export type Task = Database["public"]["Tables"]["tasks"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type CreditTransaction =
  Database["public"]["Tables"]["credit_transactions"]["Row"];
