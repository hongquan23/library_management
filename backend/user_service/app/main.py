# backend/services/user-service/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers.user_router import router as user_router
from shared.database.init_db import init_db

app = FastAPI(title="User Service")  # ✅ Tạo app trước

# Thêm CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả domain, có thể giới hạn domain cụ thể
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Tạo bảng DB khi service khởi động
# @app.on_event("startup")
# def on_startup():
#     init_db()

# Đăng ký router
app.include_router(user_router)

@app.get("/")
def root():
    return {"message": "User Service is running"}

