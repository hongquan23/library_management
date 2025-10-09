from fastapi import FastAPI
from .routers.notification_router import router as notification_router
from .services.consumer import consume_notifications
import threading
import asyncio

app = FastAPI(title="Notification Service")

app.include_router(notification_router)



@app.on_event("startup")
async def start_consumer():
    asyncio.create_task(consume_notifications())

@app.get("/")
def root():
    return {"message": "Notification Service is running"}
