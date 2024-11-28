import amqp from 'amqplib';
import { env } from '../env';

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(env.RABBITMQ_CONNECTION);

    console.info('RabbitMQ connected');

    return connection;
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    throw error;
  }
};
