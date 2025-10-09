import json
import asyncio
from aiokafka import AIOKafkaConsumer
import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),  # Quan trọng: ghi ra stdout
        logging.StreamHandler(sys.stderr)
    ],
    force=True  # Ghi đè mọi cấu hình trước
)

logger = logging.getLogger(__name__)

KAFKA_BROKER_URL = "kafka:9092"

async def consume_notifications():
    logger.info("🎯 KAFKA CONSUMER STARTING...")
    
    try:
        logger.info(f"🔗 Connecting to Kafka at: {KAFKA_BROKER_URL}")
        
        consumer = AIOKafkaConsumer(
            "borrow.approved",
            "borrow.failed",
            bootstrap_servers=KAFKA_BROKER_URL,
            value_deserializer=lambda v: json.loads(v.decode("utf-8")) if v else None,
            group_id="notification-service",
            auto_offset_reset="earliest"
        )

        logger.info("🔄 Starting consumer...")
        await consumer.start()
        logger.info("✅ KAFKA CONSUMER CONNECTED SUCCESSFULLY!")
        logger.info(f"📡 Subscribed to topics: {consumer.subscription()}")

        logger.info("🎧 LISTENING FOR MESSAGES...")
        
        async for msg in consumer:
            event = msg.value
            topic = msg.topic
            logger.info(f"📥 RECEIVED MESSAGE - Topic: {topic}")
            logger.info(f"📦 Message content: {event}")

            member_id = event.get("member_id")
            book_id = event.get("book_id")
            status = event.get("status")

            if topic == "borrow.approved":
                notification_msg = f"📘 THÔNG BÁO: User {member_id} đã mượn sách {book_id}!"
                logger.info("🔔 " + notification_msg)
            elif topic == "borrow.failed":
                reason = event.get("reason", "Không rõ")
                notification_msg = f"❌ THÔNG BÁO: User {member_id} mượn sách {book_id} thất bại! Lý do: {reason}"
                logger.info("🔔 " + notification_msg)

    except Exception as e:
        logger.error(f"💥 ERROR in consumer: {e}")
        logger.info("🔄 Restarting consumer in 10 seconds...")
        await asyncio.sleep(10)
        asyncio.create_task(consume_notifications())