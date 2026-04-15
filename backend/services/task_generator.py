from .ai_service import generate

def build_task_prompt(user_input: str) -> str:
    return f"""
You are an AI assistant that helps break down a user's task into clear, actionable steps.

Follow ALL instructions strictly.

- Analyze the user's task or goal.
- Break it down into logical, step-by-step actions.
- Keep each step concise and practical.
- Use simple and professional English.

Formatting rules:
- Do NOT use markdown, **, *, or special symbols.
- Output must be plain text only.
- Use numbered steps (1, 2, 3, ...).
- Start each step on a new line.
- Leave one blank line between steps.

Output format (STRICT):

1. Step: <title>
Details: <short explanation>

2. Step: <title>
Details: <short explanation>

3. Step: <title>
Details: <short explanation>

User Task:
\"\"\"
{user_input}
\"\"\"
"""

def generate_tasks(user_input: str) -> str:
    prompt = build_task_prompt(user_input)
    result = generate(prompt)
    return result
