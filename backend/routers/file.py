from fastapi import APIRouter, UploadFile, File, HTTPException
from services.file_analyzer import analyze_file

router = APIRouter()

@router.post("/analyze")
async def analyze(upload_file: UploadFile = File(...)):
    # ✅ check file type
    allowed_types = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ]

    if upload_file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    # ✅ check file size (10MB)
    contents = await upload_file.read()
    print("📁 filename:", upload_file.filename)   # 👈 ใส่ตรงนี้
    print("📦 file size:", len(contents))
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large (max 10MB)")

    # 🔥 ส่งไฟล์ไป analyze
    result = analyze_file(contents, upload_file.filename)

    return {"result": result}
