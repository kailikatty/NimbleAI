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
You are an AI File Analyzer.

Step 1:
Identify the type of content (e.g., resume, report, email, article, data, presentation, etc.)

Step 2:
Based on the detected type, analyze the content appropriately.

Step 3:
Adapt your analysis depth based on the complexity of the content.

Guidelines:
- Use a professional and clear tone
- Format the output cleanly for web display
- Do not invent information

Output structure:

Content Type:
State what type of file this is.

Summary:
Provide a concise summary.

Key Insights:
Provide 3–5 important insights.

Key Points:
List main points in numbered format.

If the content is a resume:
- Add: Strengths, Weaknesses, Suggestions

If the content is a report/article:
- Add: Key Findings, Conclusion

If the content is data (table, excel):
- Add: Trends, Observations, Recommendations

Content:
{text}
"""
    return generate(prompt)

