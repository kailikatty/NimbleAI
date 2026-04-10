from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# import routers
from routers import email, task, reply, file

app = FastAPI(
    title="AI Productivity Assistant API",
    description="Backend for AI automation system",
    version="1.0"
)

# ✅ เปิดให้ frontend (localhost / vercel) เรียก API ได้
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev ใช้ * ได้เลย
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ include routers (แยก feature)
app.include_router(email.router, prefix="/email", tags=["Email"])
app.include_router(task.router, prefix="/task", tags=["Task"])
app.include_router(reply.router, prefix="/reply", tags=["Reply"])
app.include_router(file.router, prefix="/file", tags=["File"])

# ✅ test endpoint
@app.get("/")
def home():
    return {"message": "API is running 🚀"}