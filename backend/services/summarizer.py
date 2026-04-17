from .ai_service import generate

def build_prompt(email_text: str) -> str:
    return f"""
You are an AI assistant that summarizes emails clearly and accurately.

Instructions:
- Summarize the email in less than 130 words.
- Ensure the summary is precise, concise, and easy to understand.
- Use clear paragraph spacing.
- Start each section on a new line.
- DO NOT use any markdown formatting such as **, *, or symbols.
- Return plain text only.

Email:
\"\"\"
{email_text}
\"\"\"
"""

def summarize_email(email_text: str) -> str:
    prompt = build_prompt(email_text)

    # 👇 ตรงนี้คือ "จบ"
    result = generate(prompt)

    return result
