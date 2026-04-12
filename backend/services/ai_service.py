import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")

model = genai.GenerativeModel("gemini-2.5-flash")

def generate(prompt: str):
    response = model.generate_content(prompt)
    return response.text
