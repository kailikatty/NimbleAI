from .ai_service import generate

def summarize_email(text: str):
    prompt = f"""
    Summarize this email clearly.
    Include:
    - Key points
    - Action items
    - Deadlines

    Email:
    {text}
    """
    return generate(prompt)
