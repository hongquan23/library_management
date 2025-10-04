from kafka import KafkaConsumer
import json
import logging
from sqlalchemy.orm import Session
from shared.database.session import SessionLocal
from ..controllers.book_controller import BookController

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class KafkaBookConsumer:
    def __init__(self, topic="borrow.approved", group_id="book_service", bootstrap_servers="kafka:29092"):
        self.topic = topic
        self.group_id = group_id
        self.bootstrap_servers = bootstrap_servers

    def consume_messages(self):
        consumer = KafkaConsumer(
            self.topic,
            bootstrap_servers=[self.bootstrap_servers],
            group_id=self.group_id,
            value_deserializer=lambda x: json.loads(x.decode("utf-8")),
            auto_offset_reset="earliest",
            enable_auto_commit=True,
        )
        logger.info(f"Book Service Consumer listening on topic: {self.topic}")

        for message in consumer:
            data = message.value
            logger.info(f"📩 Received event from Kafka: {data}")

            # Xử lý event: Giảm stock của sách khi borrow được approve
            self.process_borrow_approved(data)

    def process_borrow_approved(self, data: dict):
        db: Session = SessionLocal()
        try:
            book_id = data.get("book_id")
            logger.info(f"📚 Updating stock for book_id={book_id}")

            # Gọi controller để giảm stock
            BookController.decrease_stock(book_id, db)

            logger.info(f"✅ Stock updated successfully for book_id={book_id}")
        except Exception as e:
            logger.error(f"❌ Error processing borrow.approved event: {e}")
        finally:
            db.close()
