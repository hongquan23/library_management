from fastapi import FastAPI
from .routers.book_router import router as book_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
app = FastAPI(title="Book Service")
import os
# Đăng ký router
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

# Mount static
app.mount("/image", StaticFiles(directory=IMAGE_DIR), name="image")
@app.get("/")
def root():
    return {"message": "Book Service is running"}
