"""Shopify Admin API tools."""

from tools.base import make_tool


async def get_products(**kwargs):
    """Get products from Shopify store."""
    # Will be implemented with actual Shopify Admin API calls
    return {"products": [], "message": "Shopify API not yet configured"}


async def update_product(**kwargs):
    """Update a product in Shopify."""
    return {"success": False, "message": "Shopify API not yet configured"}


async def get_orders(**kwargs):
    """Get recent orders."""
    return {"orders": [], "message": "Shopify API not yet configured"}


async def get_inventory(**kwargs):
    """Get inventory levels."""
    return {"inventory": [], "message": "Shopify API not yet configured"}


SHOPIFY_TOOLS = [
    make_tool(
        name="shopify_get_products",
        description="Get products from the Shopify store. Can filter by collection, status, or search query.",
        parameters={
            "type": "object",
            "properties": {
                "limit": {"type": "integer", "description": "Max products to return (default 10)", "default": 10},
                "collection_id": {"type": "string", "description": "Filter by collection ID"},
                "query": {"type": "string", "description": "Search query for products"},
            },
        },
        handler=get_products,
    ),
    make_tool(
        name="shopify_update_product",
        description="Update a product's title, description, tags, or other fields.",
        parameters={
            "type": "object",
            "properties": {
                "product_id": {"type": "string", "description": "The product ID to update"},
                "title": {"type": "string", "description": "New product title"},
                "body_html": {"type": "string", "description": "New product description (HTML)"},
                "tags": {"type": "string", "description": "Comma-separated tags"},
            },
            "required": ["product_id"],
        },
        handler=update_product,
    ),
    make_tool(
        name="shopify_get_orders",
        description="Get recent orders from the store.",
        parameters={
            "type": "object",
            "properties": {
                "limit": {"type": "integer", "description": "Max orders to return", "default": 10},
                "status": {"type": "string", "enum": ["open", "closed", "any"], "default": "any"},
            },
        },
        handler=get_orders,
    ),
    make_tool(
        name="shopify_get_inventory",
        description="Get inventory levels for products.",
        parameters={
            "type": "object",
            "properties": {
                "product_id": {"type": "string", "description": "Specific product ID (optional)"},
            },
        },
        handler=get_inventory,
    ),
]
