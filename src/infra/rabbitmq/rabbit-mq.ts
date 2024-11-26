import amqp from 'amqplib';
import { env } from '../env';

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(env.RABBITMQ_CONNECTION);
    const channel = await connection.createChannel();

    const queue = env.RABBITMQ_QUEUE;
    await channel.assertQueue(queue, { durable: true });

    console.info('RabbitMQ connected');

    return { connection, channel, queue };
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    throw error;
  }
};
