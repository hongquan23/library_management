import json
import asyncio
from aiokafka import AIOKafkaConsumer
from sqlalchemy.orm import Session
from shared.database.session import get_db
from .producer import send_kafka_event
from ..controllers.book_controller import BookController

KAFKA_BROKER_URL = "kafka:9092"
TOPIC = "borrow.requested"

async def consume_borrow_requests():
    loop = asyncio.get_event_loop()
    consumer = AIOKafkaConsumer(
        TOPIC,
        loop=loop,
        bootstrap_servers=KAFKA_BROKER_URL,
        value_deserializer=lambda v: json.loads(v.decode("utf-8")),
        group_id="book-service",
        enable_auto_commit=True,
        auto_offset_reset="earliest"
    )
    await consumer.start()
    try:
        async for msg in consumer:
            event = msg.value
            borrow_id = event["id"]   # borrow record id do borrow_service tạo
            book_id = event["book_id"]
            member_id = event["member_id"]

            db: Session = next(get_db())
            try:
                # kiểm tra stock
                book = BookController.get_book(book_id, db)
                if book.available_copies > 0:
                    # trừ stock
                    book = BookController.decrease_stock(book_id, db)

                    await send_kafka_event("borrow.approved", {
                        "id": borrow_id,
                        "book_id": book.id,
                        "member_id": member_id,
                        "status": "APPROVED"
                    })
                else:
                    # hết sách
                    await send_kafka_event("borrow.failed", {
                        "id": borrow_id,
                        "book_id": book_id,
                        "member_id": member_id,
                        "status": "FAILED",
                        "reason": "Out of stock"
                    })
            finally:
                db.close()

    finally:
        await consumer.stop()
