#!/bin/bash

# ====== Cấu hình ======
KAFKA_CONTAINER="kafka"           # Tên container Kafka
KAFKA_DATA_VOLUME="/kafka/data"   # Volume Kafka mount
BROKER_IPS=("127.0.0.1")          # Danh sách IP broker khác trong cluster

# ====== 1. CPU & Memory ======
echo "===== CPU & Memory ====="
docker stats --no-stream $KAFKA_CONTAINER

# ====== 2. Test Disk Write Speed ======
echo -e "\n===== Disk Write Speed ====="
docker exec -it $KAFKA_CONTAINER bash -c "dd if=/dev/zero of=${KAFKA_DATA_VOLUME}/testfile bs=1M count=100 oflag=direct; rm ${KAFKA_DATA_VOLUME}/testfile"

# ====== 3. I/O Stats ======
echo -e "\n===== I/O Stats (iostat 1s x5) ====="
docker exec -it $KAFKA_CONTAINER bash -c "iostat -x 1 5"

# ====== 4. Network Latency ======
echo -e "\n===== Network Latency to Other Brokers ====="
for ip in "${BROKER_IPS[@]}"; do
    docker exec -it $KAFKA_CONTAINER bash -c "echo 'Ping $ip'; ping -c 4 $ip"
done

# ====== 5. Kafka Partition & Replication Lag ======
echo -e "\n===== Kafka Topics & Replication Status ====="
docker exec -it $KAFKA_CONTAINER bash -c "kafka-topics --bootstrap-server localhost:9092 --describe"

# ====== 6. Last 20 ERROR logs ======
echo -e "\n===== Last 20 ERROR logs ====="
docker exec -it $KAFKA_CONTAINER bash -c "tail -n 20 /kafka/logs/server.log | grep ERROR"
