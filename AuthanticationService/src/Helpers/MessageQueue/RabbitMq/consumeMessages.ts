import amqp, { ConsumeMessage } from 'amqplib';

async function consumeMessages(exchangeName: string, queueName: string, routeKey: string) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertExchange(exchangeName, 'direct');

  const q = await channel.assertQueue(queueName);

  await channel.bindQueue(q.queue, exchangeName, routeKey);

  channel.consume(q.queue, (msg: ConsumeMessage | null) => {
    if (msg && msg.content) {
      const data = JSON.parse(msg.content.toString());
      console.log(msg, data);
      channel.ack(msg);
    }
  });
}

export default consumeMessages;