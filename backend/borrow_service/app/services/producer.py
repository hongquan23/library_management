# borrow_service/app/services/producer.py
import json
import asyncio
from aiokafka import AIOKafkaProducer

producer: AIOKafkaProducer | None = None


async def get_producer() -> AIOKafkaProducer:
    """
    Khởi tạo Kafka producer (singleton)
    """
    global producer
    if producer is None:
        producer = AIOKafkaProducer(
            bootstrap_servers="kafka:9092",   # Đổi theo docker-compose của bạn
            value_serializer=lambda v: json.dumps(v).encode("utf-8")
        )
        
        await producer.start()
    return producer


async def send_kafka_event(topic: str, message: dict):
    """
    Gửi event Kafka
    """
    kafka_producer = await get_producer()
    try:
        await kafka_producer.send_and_wait(topic, message)
        print(f"[Kafka Producer] Sent to {topic}: {message}")
    except Exception as e:
        print(f"[Kafka Producer] Error: {e}")


async def close_producer():
    """
    Dùng để shutdown producer khi app dừng
    """
    global producer
    if producer is not None:
        await producer.stop()
        producer = None
