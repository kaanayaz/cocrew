"""Web search tools available to all agents."""

from tools.base import make_tool


async def web_search(**kwargs):
    """Search the web for information."""
    query = kwargs.get("query", "")
    # Will be implemented with a search API (e.g., Tavily, SerpAPI)
    return {
        "results": [],
        "message": f"Web search for '{query}' — search API not yet configured",
    }


WEB_SEARCH_TOOLS = [
    make_tool(
        name="web_search",
        description="Search the web for current information. Useful for competitor research, trend analysis, and finding reference material.",
        parameters={
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Search query"},
                "num_results": {"type": "integer", "default": 5},
            },
            "required": ["query"],
        },
        handler=web_search,
    ),
]
