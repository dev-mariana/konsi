import { FastifyInstance } from 'fastify';
import { publisherController } from './publisher.controller';
import { searchController } from './search.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/benefits/publisher', publisherController);
  app.get('/benefits/search', searchController);
  app.get('/', async (_, reply) => {
    return reply.view('/src/views/index.hbs');
  });
}
