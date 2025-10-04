from fastapi import FastAPI
from .routers.notification_router import router as notification_router
from .services.consumer import KafkaNotificationConsumer
import threading
import asyncio

app = FastAPI(title="Notification Service")

app.include_router(notification_router)

consumer = KafkaNotificationConsumer()

@app.on_event("startup")
async def start_consumer():
    asyncio.create_task(consumer.consume_messages())

@app.get("/")
def root():
    return {"message": "Notification Service is running"}
