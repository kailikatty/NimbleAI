from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def test_task():
    return {"message": "task API working"}