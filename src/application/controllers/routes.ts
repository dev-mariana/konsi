import { FastifyInstance } from 'fastify';
import { consumerController } from './consumer.controller';
import { publisherController } from './publisher.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/benefits/publisher', publisherController);
  app.get('/benefits/consumer', consumerController);
}
