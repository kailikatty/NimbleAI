from fastapi import APIRouter
from pydantic import BaseModel
from services.reply_generator import generate_reply

router = APIRouter()

class Request(BaseModel):
    text: str

@router.post("/reply/generate")
def reply(req: Request):
    return {"reply": generate_reply(req.text)}
