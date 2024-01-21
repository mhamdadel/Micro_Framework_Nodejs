import IRabbitMQProducer from "@/Utilts/Interfaces/IRabbitMQProducer";
import * as amqp from "amqplib";

class RabbitMQProducer implements IRabbitMQProducer {
  channel: amqp.Channel | undefined;

  constructor(private readonly exchangeName: string) {
    this.createChannel();
  }

  public async createChannel(): Promise<void> {
    const connection = await amqp.connect("amqp://localhost");
    this.channel = await connection.createChannel();

    await this.channel.assertExchange(this.exchangeName, "direct", {
      durable: true,
    });
  }

  public async publishMessage(routeKey: string, message: any): Promise<void> {
    if (!this.channel) {
      await this.createChannel();
    }

    const logDetails = {
      logType: routeKey,
      message,
      dateTime: new Date(),
    };

    this?.channel?.publish(
      this.exchangeName,
      routeKey,
      Buffer.from(JSON.stringify(logDetails))
    );

    console.log(`Message [${JSON.stringify(message)}] sent to [${routeKey}] done`);
  }
}

export default RabbitMQProducer;