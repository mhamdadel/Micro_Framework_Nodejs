import amqp, { Channel } from  'amqplib';

class Producer {
  private channel: Channel;

  async createChannel(): Promise<void> {
    const connection = await amqp.connect("localhost"); // url
    this.channel = connection.createChannel();
  }

  async publishMessage(routeKey: string, message: {}) {
    const exchangeName = 'logExchange';
    if (!this.channel) this.createChannel();

    await this.channel.assertExchange(exchangeName, 'direct');

    const logDetails = {
      logType: routeKey,
      message,
      dateTime: new Date(),
    };

    this.channel.publish(
      exchangeName,
      routeKey,
      Buffer.from(JSON.stringify(logDetails))
    );

    console.log(`message [ ${message} ] sent done`);
  }
}