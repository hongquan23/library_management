from fastapi import FastAPI
from .routers.book_router import router as book_router

app = FastAPI(title="Book Service")

# Đăng ký router
app.include_router(book_router)

@app.get("/")
def root():
    return {"message": "Book Service is running"}
