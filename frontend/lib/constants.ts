// ── Agent Definitions ──
export const AGENTS = {
  maya: {
    name: "Maya",
    slug: "maya-content-writer",
    role: "Content Writer",
    description:
      "Writes compelling product descriptions, blog posts, and email campaigns.",
    accentColor: "#8B5CF6",
    connectors: ["shopify", "klaviyo", "brevo"],
  },
  leo: {
    name: "Leo",
    slug: "leo-seo-specialist",
    role: "SEO Specialist",
    description:
      "Audits your store for SEO issues, optimizes meta tags, and researches keywords.",
    accentColor: "#3B82F6",
    connectors: ["shopify", "google_analytics", "klaviyo"],
  },
  ava: {
    name: "Ava",
    slug: "ava-ad-creative",
    role: "Ad Creative Director",
    description:
      "Creates scroll-stopping ad campaigns for Meta (Facebook/Instagram).",
    accentColor: "#EC4899",
    connectors: ["meta_ads", "shopify", "google_analytics", "canva"],
  },
  sam: {
    name: "Sam",
    slug: "sam-data-analyst",
    role: "Data Analyst",
    description:
      "Your numbers person. Surfaces actionable insights from all your data sources.",
    accentColor: "#10B981",
    connectors: [
      "shopify",
      "google_analytics",
      "klaviyo",
      "meta_ads",
      "brevo",
    ],
  },
  nina: {
    name: "Nina",
    slug: "nina-visual-designer",
    role: "Visual Designer",
    description:
      "Creates product images, lifestyle photos, ad creatives, and social graphics.",
    accentColor: "#F59E0B",
    connectors: ["canva", "shopify"],
  },
} as const;

// ── Connector Definitions ──
export const CONNECTORS = {
  shopify: {
    name: "Shopify",
    slug: "shopify",
    brandColor: "#96BF48",
    authType: "api_key" as const,
    category: "ecommerce",
    description:
      "Products, orders, inventory, customers, analytics, and collections.",
  },
  klaviyo: {
    name: "Klaviyo",
    slug: "klaviyo",
    brandColor: "#2D2D2D",
    authType: "api_key" as const,
    category: "email",
    description: "Email marketing, segments, flows, and campaign metrics.",
  },
  meta_ads: {
    name: "Meta Ads",
    slug: "meta_ads",
    brandColor: "#1877F2",
    authType: "oauth" as const,
    category: "advertising",
    description:
      "Facebook & Instagram ad campaigns, audiences, and performance data.",
  },
  brevo: {
    name: "Brevo",
    slug: "brevo",
    brandColor: "#0B996E",
    authType: "api_key" as const,
    category: "email",
    description:
      "Transactional & marketing email, contacts, and delivery analytics.",
  },
  google_analytics: {
    name: "Google Analytics",
    slug: "google_analytics",
    brandColor: "#E37400",
    authType: "oauth" as const,
    category: "analytics",
    description:
      "Website traffic, conversions, audience insights, and acquisition data.",
  },
  canva: {
    name: "Canva",
    slug: "canva",
    brandColor: "#00C4CC",
    authType: "oauth" as const,
    category: "design",
    description:
      "Create graphics, edit templates, access brand kit, and export images.",
  },
} as const;

// ── Credit Packs ──
export const CREDIT_PACKS = [
  {
    credits: 50,
    price: 10,
    perCredit: 0.2,
    label: null,
  },
  {
    credits: 200,
    price: 35,
    perCredit: 0.175,
    label: "POPULAR",
  },
  {
    credits: 500,
    price: 75,
    perCredit: 0.15,
    label: "BEST VALUE",
  },
] as const;
