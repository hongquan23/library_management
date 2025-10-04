import json
from aiokafka import AIOKafkaConsumer

KAFKA_BROKER = "kafka:9092"
KAFKA_GROUP = "notification_group"
KAFKA_TOPIC = "borrow_events"


class KafkaNotificationConsumer:
    def __init__(self):
        self.consumer = AIOKafkaConsumer(
            KAFKA_TOPIC,
            bootstrap_servers=KAFKA_BROKER,
            group_id=KAFKA_GROUP,
            auto_offset_reset="earliest",
            enable_auto_commit=True
        )

    async def consume_messages(self):
        await self.consumer.start()
        try:
            print(f"[NotificationConsumer] Listening on topic: {KAFKA_TOPIC}")
            async for msg in self.consumer:
                try:
                    data = json.loads(msg.value.decode("utf-8"))
                    print(f"[NotificationConsumer] New event received: {data}")
                    # 🚀 Gọi service gửi email/push notification ở đây
                except json.JSONDecodeError:
                    print(f"[NotificationConsumer] Invalid JSON: {msg.value}")
        finally:
            await self.consumer.stop()
