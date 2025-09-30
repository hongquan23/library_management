from fastapi import FastAPI
from .routers.notification_router import router as notification_router

app = FastAPI(title="Notification Service")

app.include_router(notification_router)

@app.get("/")
def root():
    return {"message": "Notification Service is running"}
