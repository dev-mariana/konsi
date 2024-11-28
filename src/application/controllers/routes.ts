import { FastifyInstance } from 'fastify';
import { publisherController } from './publisher.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/benefits/publisher', publisherController);
}
