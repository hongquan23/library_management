from fastapi import FastAPI
from .routers.book_router import router as book_router
from .services.consumer import KafkaBookConsumer
import threading

app = FastAPI(title="Book Service")

app.include_router(book_router)

consumer = KafkaBookConsumer()

@app.on_event("startup")
def start_consumer():
    thread = threading.Thread(target=consumer.consume_messages, daemon=True)
    thread.start()

@app.get("/")
def root():
    return {"message": "Book Service is running"}
