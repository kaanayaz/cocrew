"""Base tool utilities."""


def make_tool(name: str, description: str, parameters: dict, handler):
    """Create a tool definition + handler pair."""
    return {
        "definition": {
            "type": "function",
            "function": {
                "name": name,
                "description": description,
                "parameters": parameters,
            },
        },
        "handler": handler,
    }
