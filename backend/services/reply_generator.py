from .ai_service import generate

def generate_reply(text: str):
    prompt = f"""
    Write a polite and professional reply:

    {text}
    """
    return generate(prompt)
