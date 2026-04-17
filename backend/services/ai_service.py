import os
import time
from google import genai

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

def generate(prompt: str):
    max_retries = 3

    for attempt in range(max_retries):
        try:
            print("🤖 Sending request to AI...")
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )
            return getattr(response, "text", None) or str(response)

        except Exception as e:
            print("❌ AI error:", str(e))
            if "503" in str(e):
                print(f"Retry {attempt+1}...")
                time.sleep(2)
            else:
                return f"Error: {str(e)}"

    return "Error: Server busy, please try again."
    
