from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# request schema
class EmailRequest(BaseModel):
    text: str

# API endpoint
@router.post("/summarize")
def summarize_email(req: EmailRequest):
    summary = "Summary: " + req.text[:100]
    return {"summary": summary}