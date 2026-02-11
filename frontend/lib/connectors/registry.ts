import { CONNECTORS } from "@/lib/constants";

export type ConnectorSlug = keyof typeof CONNECTORS;

export interface ConnectorConfig {
  name: string;
  slug: string;
  brandColor: string;
  authType: "oauth" | "api_key";
  category: string;
  description: string;
  oauthScopes?: string[];
  apiKeyInstructions?: string;
}

// Extended configs with auth instructions
export const CONNECTOR_CONFIGS: Record<ConnectorSlug, ConnectorConfig> = {
  shopify: {
    ...CONNECTORS.shopify,
    oauthScopes: [
      "read_products",
      "write_products",
      "read_orders",
      "read_inventory",
      "read_customers",
      "read_analytics",
    ],
  },
  klaviyo: {
    ...CONNECTORS.klaviyo,
    apiKeyInstructions:
      "Go to Klaviyo → Settings → API Keys → Create Private API Key. Select Full Access for all scopes.",
  },
  meta_ads: {
    ...CONNECTORS.meta_ads,
    oauthScopes: [
      "ads_management",
      "ads_read",
      "business_management",
      "pages_read_engagement",
    ],
  },
  brevo: {
    ...CONNECTORS.brevo,
    apiKeyInstructions:
      "Go to Brevo → Settings → SMTP & API → API Keys → Generate a new API key.",
  },
  google_analytics: {
    ...CONNECTORS.google_analytics,
    oauthScopes: [
      "https://www.googleapis.com/auth/analytics.readonly",
    ],
  },
  canva: {
    ...CONNECTORS.canva,
    oauthScopes: ["design:content:read", "design:content:write"],
  },
};
