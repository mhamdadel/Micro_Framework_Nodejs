export default {
  "default": "kafka",
  "connections": {
    "kafka": {
      "brokers": process.env.KAFKA_BROKERS || "localhost:9092",
      "clientId": process.env.KAFKA_CLIENT_ID || "your_kafka_client_id",
      "groupId": process.env.KAFKA_GROUP_ID || "your_kafka_group_id",
      "options": {
        
      }
    },
    "rabbitmq": {
      "url": process.env.RABBITMQ_URL || "amqp://localhost:5672",
      "exchange": process.env.RABBITMQ_EXCHANGE || "your_exchange_name",
      "queue": process.env.RABBITMQ_QUEUE || "your_queue_name",
      "options": {
        
      }
    },
    "mqtt": {
      "url": process.env.MQTT_URL || "mqtt://localhost:1883",
      "clientId": process.env.MQTT_CLIENT_ID || "your_mqtt_client_id",
      "options": {
        
      }
    }
  }
}
