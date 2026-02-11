"""Meta Ads API tools."""

from tools.base import make_tool


async def get_ad_campaigns(**kwargs):
    return {"campaigns": [], "message": "Meta Ads API not yet configured"}


async def get_ad_insights(**kwargs):
    return {"insights": [], "message": "Meta Ads API not yet configured"}


META_ADS_TOOLS = [
    make_tool(
        name="meta_get_campaigns",
        description="Get ad campaigns from Meta (Facebook/Instagram).",
        parameters={
            "type": "object",
            "properties": {
                "limit": {"type": "integer", "default": 10},
                "status": {"type": "string", "enum": ["ACTIVE", "PAUSED", "ARCHIVED"]},
            },
        },
        handler=get_ad_campaigns,
    ),
    make_tool(
        name="meta_get_insights",
        description="Get performance insights for Meta ad campaigns.",
        parameters={
            "type": "object",
            "properties": {
                "campaign_id": {"type": "string"},
                "timeframe": {"type": "string", "enum": ["7d", "30d", "90d"], "default": "30d"},
            },
        },
        handler=get_ad_insights,
    ),
]
