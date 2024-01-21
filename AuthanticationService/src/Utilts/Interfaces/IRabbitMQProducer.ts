import amqp from 'amqplib';

interface IRabbitMQProducer {
  channel: amqp.Channel | undefined;
  createChannel(): void;
  publishMessage(routeKey: string, message: any): void;
}

export default IRabbitMQProducer;