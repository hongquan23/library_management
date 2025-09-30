from fastapi import FastAPI
from .routers.borrow_router import router as borrow_router

app = FastAPI(title="Borrow Service")

# Register router
app.include_router(borrow_router)


@app.get("/")
def root():
    return {"message": "Borrow Service is running"}
