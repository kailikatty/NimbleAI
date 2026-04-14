from .ai_service import generate

def build_prompt(email_text: str) -> str:
    return f"""
You are an AI assistant that summarizes emails clearly and accurately.

Instructions:
- Summarize the email in less than 150 words.
- Analyze the key points and intent of the email.
- Ensure the summary is precise, concise, and easy to understand.
- Use clear paragraph spacing.
- Start each section on a new line.
- Add a line break between sections for readability.

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
