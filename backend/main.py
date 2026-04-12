from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# import routers
from routers import email, task, reply, file

app = FastAPI(
    title="AI Productivity Assistant API",
    description="Backend for AI automation system",
    version="1.0"
)

# ✅ CORS (ให้ frontend เรียกได้)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ตอน deploy จริงค่อยจำกัด domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ include routers
app.include_router(email.router, prefix="/email", tags=["Email"])
app.include_router(task.router, prefix="/task", tags=["Task"])
app.include_router(reply.router, prefix="/reply", tags=["Reply"])
app.include_router(file.router, prefix="/file", tags=["File"])

# ✅ health check
@app.get("/")
def home():
    return {"message": "API is running 🚀"}


# 🔥 IMPORTANT: สำหรับ Render / production
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8000))
    )
