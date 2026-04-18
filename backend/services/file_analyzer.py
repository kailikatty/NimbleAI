from .ai_service import generate
from io import BytesIO

# import parser
from services.parsers.pdf_parser import extract_pdf
from services.parsers.docx_parser import extract_docx
from services.parsers.excel_parser import extract_excel
from services.parsers.ppt_parser import extract_ppt

def analyze_file(file_bytes, filename: str):
    file = BytesIO(file_bytes)

    # ✅ เลือก parser ตาม type
    if filename.endswith(".pdf"):
        text = extract_pdf(file)
    elif filename.endswith(".docx"):
        text = extract_docx(file)
    elif filename.endswith(".xlsx"):
        text = extract_excel(file)
    elif filename.endswith(".pptx"):
        text = extract_ppt(file)
    elif filename.endswith(".txt"):
        text = extract_txt(file)
    else:
        return "Unsupported file type"

    # 🔥 กัน text ยาวเกิน
    text = text[:5000]

    # ✅ ส่งเข้า AI
    prompt = f"""
You are an AI File Analyzer. Follow all instruction strictly.

Step 1:
Identify the type of content (e.g., resume, report, email, article, data, presentation, etc.)

Step 2:
Based on the detected type, analyze the content appropriately and summary the content.

Important:
- Use a professional English and clear tone
- Use plain text only (no markdown symbols like ** or ##) 
- DO NOT invent information

Output format:
Summary:
<summary>

Key Insights:
1. ...
2. ...
3. ...

Key Points:
1. ...
2. ...
3. ...

If the content is a resume:
- Add: Strengths, Weaknesses, Suggestions
1. ...
2. ...
3. ...

If the content is a report/article:
- Add: Key Findings, Conclusion

If the content is data (table, excel):
- Add: Trends, Observations, Recommendations

Content:
{text}
"""
    return generate(prompt)

