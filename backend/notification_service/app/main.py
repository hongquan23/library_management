from fastapi import FastAPI
from .routers.notification_router import router as notification_router
from .services.consumer import consume_notifications
import threading
import asyncio
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Notification Service")
app.add_middleware(
    CORSMiddleware,
allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173"
],
allow_credentials=True,

    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notification_router)



@app.on_event("startup")
async def start_consumer():
    asyncio.create_task(consume_notifications())

@app.get("/")
def root():
    return {"message": "Notification Service is running"}
