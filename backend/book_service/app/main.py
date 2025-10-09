import asyncio
from fastapi import FastAPI
from .routers.book_router import router as book_router
from .services.consumer import consume_borrow_requests
import threading
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from .services.producer import close_producer, get_producer

app = FastAPI(title="Book Service")


app.include_router(book_router)
# Cho phép frontend React gọi API
origins = [
    "http://localhost:5173",   # React dev
]
# Cấu hình CORS (cho React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # origin nào được phép
    allow_credentials=True,
    allow_methods=["*"],         # tất cả method: GET, POST, PUT, DELETE
    allow_headers=["*"],         # tất cả header
)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))   # book_service/app
ROOT_DIR = os.path.dirname(BASE_DIR)                   # book_service
IMAGE_DIR = os.path.join(ROOT_DIR, "image")



@app.on_event("startup")
async def startup_event():
    # Khởi tạo Kafka producer khi app khởi động
    await get_producer()
    asyncio.create_task(consume_borrow_requests())

@app.on_event("shutdown")
async def shutdown_event():
    # Đóng Kafka producer khi app tắt
    await close_producer()


# Mount static
app.mount("/image", StaticFiles(directory=IMAGE_DIR), name="image")

@app.get("/")
def root():
    return {"message": "Book Service is running"}
