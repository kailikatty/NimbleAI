from fastapi import APIRouter
from pydantic import BaseModel
from services.task_generator import generate_tasks

router = APIRouter()

class TaskRequest(BaseModel):
    text: str

@router.post("/task")
def create_tasks(request: TaskRequest):
    result = generate_tasks(request.text)
    return {"tasks": result}
