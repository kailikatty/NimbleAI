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
    else:
        return "Unsupported file type"

    # 🔥 กัน text ยาวเกิน
    text = text[:5000]

    # ✅ ส่งเข้า AI
    prompt = f"""
Analyze this content and summarize key insights.

Include:
- Main points
- Important details
- Key takeaways

Content:
{text}
"""
    return generate(prompt)

