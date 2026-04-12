from fastapi import APIRouter
from pydantic import BaseModel
from services.file_analyzer import analyze_file

router = APIRouter()

class Request(BaseModel):
    text: str

@router.post("/file/analyze")
def analyze(req: Request):
    return {"result": analyze_file(req.text)}
