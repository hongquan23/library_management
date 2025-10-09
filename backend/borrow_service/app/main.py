import asyncio
from fastapi import FastAPI
from .routers.borrow_router import router as borrow_router
from .services.producer import close_producer, get_producer
from .services.consumer import consume_borrow_responses
app = FastAPI(title="Borrow Service")

# Register router
app.include_router(borrow_router)

@app.on_event("startup")
async def startup_event():
    # Khởi tạo Kafka producer khi app khởi động
    await get_producer()
    asyncio.create_task(consume_borrow_responses())

@app.on_event("shutdown")
async def shutdown_event():
    # Đóng Kafka producer khi app tắt
    await close_producer()

@app.get("/")
def root():
    return {"message": "Borrow Service is running"}
