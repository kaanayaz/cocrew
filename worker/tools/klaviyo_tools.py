"""Klaviyo API tools."""

from tools.base import make_tool


async def get_campaigns(**kwargs):
    return {"campaigns": [], "message": "Klaviyo API not yet configured"}


async def get_segments(**kwargs):
    return {"segments": [], "message": "Klaviyo API not yet configured"}


async def get_metrics(**kwargs):
    return {"metrics": [], "message": "Klaviyo API not yet configured"}


KLAVIYO_TOOLS = [
    make_tool(
        name="klaviyo_get_campaigns",
        description="Get email campaigns from Klaviyo with performance metrics.",
        parameters={
            "type": "object",
            "properties": {
                "limit": {"type": "integer", "default": 10},
                "status": {"type": "string", "enum": ["draft", "scheduled", "sent"]},
            },
        },
        handler=get_campaigns,
    ),
    make_tool(
        name="klaviyo_get_segments",
        description="Get audience segments from Klaviyo.",
        parameters={
            "type": "object",
            "properties": {
                "limit": {"type": "integer", "default": 10},
            },
        },
        handler=get_segments,
    ),
    make_tool(
        name="klaviyo_get_metrics",
        description="Get email performance metrics (opens, clicks, revenue).",
        parameters={
            "type": "object",
            "properties": {
                "metric_name": {"type": "string", "description": "Specific metric to retrieve"},
                "timeframe": {"type": "string", "enum": ["7d", "30d", "90d"], "default": "30d"},
            },
        },
        handler=get_metrics,
    ),
]
