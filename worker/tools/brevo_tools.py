"""Brevo (Sendinblue) API tools."""

from tools.base import make_tool


async def get_contacts(**kwargs):
    return {"contacts": [], "message": "Brevo API not yet configured"}


async def get_email_campaigns(**kwargs):
    return {"campaigns": [], "message": "Brevo API not yet configured"}


BREVO_TOOLS = [
    make_tool(
        name="brevo_get_contacts",
        description="Get contacts from Brevo.",
        parameters={
            "type": "object",
            "properties": {
                "limit": {"type": "integer", "default": 10},
                "list_id": {"type": "integer", "description": "Filter by list ID"},
            },
        },
        handler=get_contacts,
    ),
    make_tool(
        name="brevo_get_campaigns",
        description="Get email campaigns from Brevo with delivery stats.",
        parameters={
            "type": "object",
            "properties": {
                "limit": {"type": "integer", "default": 10},
                "status": {"type": "string", "enum": ["draft", "sent", "queued"]},
            },
        },
        handler=get_email_campaigns,
    ),
]
