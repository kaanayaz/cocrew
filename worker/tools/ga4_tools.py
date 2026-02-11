"""Google Analytics 4 Data API tools."""

from tools.base import make_tool


async def get_traffic_report(**kwargs):
    return {"report": [], "message": "GA4 API not yet configured"}


async def get_conversions(**kwargs):
    return {"conversions": [], "message": "GA4 API not yet configured"}


GA4_TOOLS = [
    make_tool(
        name="ga4_get_traffic",
        description="Get website traffic data from Google Analytics 4.",
        parameters={
            "type": "object",
            "properties": {
                "timeframe": {"type": "string", "enum": ["7d", "30d", "90d"], "default": "30d"},
                "dimensions": {"type": "array", "items": {"type": "string"}, "description": "Dimensions like 'source', 'medium', 'page'"},
            },
        },
        handler=get_traffic_report,
    ),
    make_tool(
        name="ga4_get_conversions",
        description="Get conversion data from Google Analytics 4.",
        parameters={
            "type": "object",
            "properties": {
                "timeframe": {"type": "string", "enum": ["7d", "30d", "90d"], "default": "30d"},
            },
        },
        handler=get_conversions,
    ),
]
