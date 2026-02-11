import { CONNECTORS } from "@/lib/constants";

export type ConnectorSlug = keyof typeof CONNECTORS;

export interface ApiKeyField {
  name: string;
  label: string;
  placeholder: string;
  type?: "password" | "text"; // defaults to "password"
}

export interface ConnectorConfig {
  name: string;
  slug: string;
  brandColor: string;
  authType: "oauth" | "api_key";
  category: string;
  description: string;
  oauthScopes?: string[];
  apiKeyInstructions?: string;
  apiKeyFields?: ApiKeyField[];
}

// Extended configs with auth instructions
export const CONNECTOR_CONFIGS: Record<ConnectorSlug, ConnectorConfig> = {
  shopify: {
    ...CONNECTORS.shopify,
    apiKeyInstructions:
      "1. Go to your **Shopify Admin** → **Settings** → **Apps and sales channels**\n2. Click **Develop apps** → **Create an app**\n3. Name it \"cocrew.ai\" → click **Configure Admin API scopes**\n4. Enable: `read_products`, `write_products`, `read_orders`, `read_inventory`, `read_customers`, `read_analytics`\n5. Click **Install app** → Copy the **Admin API access token** (starts with `shpat_`)",
    apiKeyFields: [
      {
        name: "store_domain",
        label: "Store Domain",
        placeholder: "mystore.myshopify.com",
        type: "text",
      },
      {
        name: "access_token",
        label: "Admin API Access Token",
        placeholder: "shpat_...",
        type: "password",
      },
    ],
  },
  klaviyo: {
    ...CONNECTORS.klaviyo,
    apiKeyInstructions:
      "Go to Klaviyo → Settings → API Keys → Create Private API Key. Select Full Access for all scopes.",
    apiKeyFields: [
      {
        name: "api_key",
        label: "Private API Key",
        placeholder: "pk_...",
        type: "password",
      },
    ],
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
    apiKeyFields: [
      {
        name: "api_key",
        label: "API Key",
        placeholder: "xkeysib-...",
        type: "password",
      },
    ],
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
