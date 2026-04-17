from docx import Document

def extract_docx(file):
    doc = Document(file)
    return "\n".join([p.text for p in doc.paragraphs])