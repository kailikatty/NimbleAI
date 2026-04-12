from .ai_service import generate

def generate_tasks(text: str):
    prompt = f"""
    Break this into actionable tasks:

    {text}
    """
    return generate(prompt)
