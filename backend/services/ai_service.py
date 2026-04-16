import os
from google import genai

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

def generate(prompt: str):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        # safest way
        return getattr(response, "text", None) or str(response)

    except Exception as e:
        if "503" in str(e):
            print(f"Retry {attempt+1}...")
            time.sleep(2)  # รอ 2 วิ
        else:
            return f"Error: {str(e)}"

    return "Error: Server busy, please try again."
    
