from services.ai_service import generate

def build_task_prompt(user_input: str) -> str:
    return f"""
You are an AI assistant that helps break down a user's task into clear, actionable steps.

Follow all instructions strictly.
- Prioritize answering the user's question and break it down into the list 1,2,3...
- If the user ask about the task or goal, break it down into logical, step-by-step actions.
- Keep each step concise and practical.
- Use simple and professional English.

Formatting rules:
- Do not use markdown formatting like ** or *.
- Output must be plain text only.
- Use numbered steps (1, 2, 3, ...).
- Start each step on a new line.
- Leave one blank line between steps.

Output format:

1. <title>
<short explanation>

2. <title>
<short explanation>

User Task:
{user_input}
"""

def generate_tasks(user_input: str) -> str:
    print("INPUT:", user_input)

    prompt = build_task_prompt(user_input)
    print("PROMPT:", prompt)

    result = generate(prompt)
    print("RESULT:", result)

    return result
