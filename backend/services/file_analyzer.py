from .ai_service import generate

def analyze_file(text: str):
    prompt = f"""
    Analyze this content and summarize key insights.
    Include:
    - Main points
    - Important details
    - Key takeaways

    Content:
    {text}
    """
    return generate(prompt)
