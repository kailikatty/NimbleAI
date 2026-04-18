from .ai_service import generate
from io import BytesIO

# import parser
from services.parsers.pdf_parser import extract_pdf
from services.parsers.docx_parser import extract_docx
from services.parsers.excel_parser import extract_excel
from services.parsers.ppt_parser import extract_ppt
from services.parsers.txt_parser import extract_txt

def analyze_file(file_bytes, filename: str):
    file = BytesIO(file_bytes)

    # 🔥 เพิ่มตรงนี้เลย
    ext = filename.lower().strip()

    # ✅ เลือก parser ตาม type
    if ext.endswith(".pdf"):
        text = extract_pdf(file)

    elif ext.endswith(".docx"):
        text = extract_docx(file)

    elif ext.endswith(".xlsx"):
        text = extract_excel(file)

    elif ext.endswith(".pptx"):
        text = extract_ppt(file)

    elif ext.endswith(".txt"):
        file.seek(0)
        text = extract_txt(file)

        print("TXT CONTENT:", text[:100])  # debug

    else:
        print("❌ NOT SUPPORTED:", filename)  # debug
        return "Unsupported file type"

    if not text:
        return "No content extracted from file"
        
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

