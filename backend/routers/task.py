from fastapi import APIRouter
from pydantic import BaseModel
from services.task_generator import generate_tasks

router = APIRouter()

class Request(BaseModel):
    text: str

@router.post("/task/generate")
def task(req: Request):
    return {"tasks": generate_tasks(req.text)}
