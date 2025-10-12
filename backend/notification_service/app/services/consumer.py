import json
import asyncio
from aiokafka import AIOKafkaConsumer
import logging
import sys
import asyncpg
from datetime import datetime

# ----------------------------
# 🔧 Logging config
# ----------------------------
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)],
    force=True
)

logger = logging.getLogger(__name__)

# ----------------------------
# ⚙️ Config
# ----------------------------
KAFKA_BROKER_URL = "kafka:9092"
POSTGRES_DSN = "postgresql://hongquan:luonghongquan@postgres/library_db"  # ⚠️ chỉnh đúng DB


# ----------------------------
# 💾 Lưu thông báo vào DB
# ----------------------------
async def save_notification(conn, user_id: int, message: str):
    try:
        await conn.execute(
            """
            INSERT INTO notifications (user_id, message, created_at, is_read)
            VALUES ($1, $2, $3, 0)
            """,
            user_id,
            message,
            datetime.now(),
        )
        logger.info(f"✅ Đã lưu thông báo cho {user_id}")
    except Exception as e:
        logger.error(f"⚠️ Lỗi khi lưu thông báo: {e}")


# ----------------------------
# 🎧 Kafka Consumer chạy nền
# ----------------------------
async def consume_notifications():
    logger.info("🎯 Bắt đầu consumer Kafka...")

    while True:
        try:
            # Kết nối PostgreSQL
            pg_conn = await asyncpg.connect(POSTGRES_DSN)
            logger.info("✅ Đã kết nối PostgreSQL")

            # Kết nối Kafka
            consumer = AIOKafkaConsumer(
                "borrow.approved",
                "borrow.failed",
                bootstrap_servers=KAFKA_BROKER_URL,
                value_deserializer=lambda v: json.loads(v.decode("utf-8")) if v else None,
                group_id="notification-service",
                auto_offset_reset="earliest"
            )

            await consumer.start()
            logger.info("✅ Đã kết nối Kafka và bắt đầu lắng nghe...")

            async for msg in consumer:
                event = msg.value
                topic = msg.topic
                logger.info(f"📥 Nhận message từ {topic}: {event}")

                member_id = event.get("member_id")
                book_id = event.get("book_id")

                # 🔹 Lấy username
                user_row = await pg_conn.fetchrow("SELECT username FROM users WHERE id = $1", member_id)
                username = user_row["username"] if user_row else f"User {member_id}"

                # 🔹 Lấy tiêu đề sách
                book_row = await pg_conn.fetchrow("SELECT title FROM books WHERE id = $1", book_id)
                book_title = book_row["title"] if book_row else f"Sách ID {book_id}"

                # 🔹 Tạo thông báo
                if topic == "borrow.approved":
                    message = f"{username} đã mượn sách '{book_title}' thành công!"
                elif topic == "borrow.failed":
                    reason = "sách đã được mượn hết"  # Giả sử lý do cố định
                    message = f"{username} mượn sách '{book_title}' thất bại! Lý do: {reason}"
                else:
                    continue

                await save_notification(pg_conn, member_id, message)

        except Exception as e:
            logger.error(f"💥 Lỗi consumer: {e}")
            logger.info("🔁 Thử kết nối lại sau 10 giây...")
            await asyncio.sleep(10)
        finally:
            try:
                await consumer.stop()
                await pg_conn.close()
            except Exception:
                pass
