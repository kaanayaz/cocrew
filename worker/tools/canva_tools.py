"""Canva Connect API tools."""

from tools.base import make_tool


async def get_designs(**kwargs):
    return {"designs": [], "message": "Canva API not yet configured"}


async def create_design(**kwargs):
    return {"design": None, "message": "Canva API not yet configured"}


CANVA_TOOLS = [
    make_tool(
        name="canva_get_designs",
        description="Get designs from Canva.",
        parameters={
            "type": "object",
            "properties": {
                "limit": {"type": "integer", "default": 10},
                "type": {"type": "string", "description": "Design type filter"},
            },
        },
        handler=get_designs,
    ),
    make_tool(
        name="canva_create_design",
        description="Create a new design in Canva from a template.",
        parameters={
            "type": "object",
            "properties": {
                "template_id": {"type": "string", "description": "Template to use"},
                "title": {"type": "string", "description": "Design title"},
            },
            "required": ["title"],
        },
        handler=create_design,
    ),
]
