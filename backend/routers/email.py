from fastapi import APIRouter
from pydantic import BaseModel
from services.summarizer import summarize_email

router = APIRouter()

class Request(BaseModel):
    text: str

@router.post("/email/summarize")
def summarize(req: Request):
    return {"summary": summarize_email(req.text)}
