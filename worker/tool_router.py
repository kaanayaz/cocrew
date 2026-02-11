"""
Dynamic tool router.
Builds the list of available tools based on the agent's permissions
and the user's connected integrations.
"""

from tools.shopify_tools import SHOPIFY_TOOLS
from tools.klaviyo_tools import KLAVIYO_TOOLS
from tools.meta_ads_tools import META_ADS_TOOLS
from tools.brevo_tools import BREVO_TOOLS
from tools.ga4_tools import GA4_TOOLS
from tools.canva_tools import CANVA_TOOLS
from tools.web_search_tools import WEB_SEARCH_TOOLS

# Map connector slugs to their tool sets
CONNECTOR_TOOLS = {
    "shopify": SHOPIFY_TOOLS,
    "klaviyo": KLAVIYO_TOOLS,
    "meta_ads": META_ADS_TOOLS,
    "brevo": BREVO_TOOLS,
    "google_analytics": GA4_TOOLS,
    "canva": CANVA_TOOLS,
}

# Agent-connector permissions (which agents can use which connectors)
AGENT_PERMISSIONS = {
    "maya-content-writer": ["shopify", "klaviyo", "brevo"],
    "leo-seo-specialist": ["shopify", "google_analytics", "klaviyo"],
    "ava-ad-creative": ["meta_ads", "shopify", "google_analytics", "canva"],
    "sam-data-analyst": ["shopify", "google_analytics", "klaviyo", "meta_ads", "brevo"],
    "nina-visual-designer": ["canva", "shopify"],
}


def get_tools_for_agent(agent_slug: str, connected_tools: list[str]) -> list[dict]:
    """Get available tools for an agent based on permissions and user connections."""
    allowed_connectors = AGENT_PERMISSIONS.get(agent_slug, [])

    tools = []

    # Add connector-specific tools (only if connected AND permitted)
    for connector_slug in allowed_connectors:
        if connector_slug in connected_tools and connector_slug in CONNECTOR_TOOLS:
            tools.extend(CONNECTOR_TOOLS[connector_slug])

    # Always include web search tools
    tools.extend(WEB_SEARCH_TOOLS)

    return tools
