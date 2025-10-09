import json
import asyncio
from aiokafka import AIOKafkaConsumer
from sqlalchemy.orm import Session
from shared.database.session import get_db
from shared.models.borrow_record import BorrowRecord

KAFKA_BROKER_URL = "kafka:9092"


async def consume_borrow_responses():
    consumer = AIOKafkaConsumer(
        "borrow.approved",
        "borrow.failed",
        bootstrap_servers=KAFKA_BROKER_URL,
        value_deserializer=lambda v: json.loads(v.decode("utf-8")),
        group_id="borrow-service",
        auto_offset_reset="earliest",
    )
    await consumer.start()
    try:
        async for msg in consumer:
            event = msg.value
            print(f"[BorrowService Consumer] Received {msg.topic}: {event}")

            record_id = event.get("id")
            status = event.get("status")

            db = next(get_db())
            try:
                record = db.query(BorrowRecord).filter(BorrowRecord.id == record_id).first()
                if record:
                    record.status = status
                    db.commit()
                    print(f"[BorrowService Consumer] Updated record {record_id} → {status}")
                else:
                    print(f"[BorrowService Consumer] Record {record_id} not found")
            finally:
                db.close()
    finally:
        await consumer.stop()
