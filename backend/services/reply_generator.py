from .ai_service import generate

def generate_reply(text: str):
    prompt = f"""
You are an AI assistant for auto-replying to messages.

Your tasks:
1. Understand the user's intent
2. Summarize the message in 1 sentence (internally)
3. Generate a helpful reply

Rules:
- Be polite and professional
- Keep the reply under 150 words
- If the user is asking for help, provide actionable suggestions
- If it's a complaint, show empathy
- If it's unclear, ask a clarifying question
- Do not hallucinate information

Message:
{text}

Reply:
"""
    return generate(prompt)
