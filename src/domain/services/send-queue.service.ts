import { env } from '../../infra/env';
import { connectRabbitMQ } from '../../infra/rabbitmq/rabbit-mq';

export class SendQueueService {
  constructor() {}

  async execute(taxId: string, benefits: any): Promise<void> {
    const connection = await connectRabbitMQ();
    const channel = await connection.createChannel();
    const queue = env.RABBITMQ_QUEUE;

    await channel.assertQueue(queue, { durable: true });

    const message = JSON.stringify({ taxId, benefits });

    console.info('Message sent to queue:', message);

    await channel.sendToQueue(queue, Buffer.from(message), {
      persistent: true,
    });
  }
}
