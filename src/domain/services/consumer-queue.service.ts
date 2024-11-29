import { env } from '../../infra/env';
import { connectRabbitMQ } from '../../infra/rabbitmq/rabbit-mq';
import { Message } from '../entities/message';

export class ConsumerQueueService {
  constructor() {}

  async execute(): Promise<Message[]> {
    const connection = await connectRabbitMQ();
    const channel = await connection.createChannel();
    const queue = env.RABBITMQ_QUEUE;

    await channel.assertQueue(queue, { durable: true });

    const messages: Message[] = [];

    await channel.consume(
      queue,
      (msg) => {
        if (msg) {
          messages.push(JSON.parse(msg.content.toString()));
          channel.ack(msg);

          console.info('Message received from queue:', messages);
        }
      },
      { noAck: false },
    );

    return messages;
  }
}
