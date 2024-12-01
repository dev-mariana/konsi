import fastifyRedis from '@fastify/redis';
import fastifyView from '@fastify/view';
import fastify from 'fastify';
import Handlebars from 'handlebars';
import { ZodError } from 'zod';
import { appRoutes } from './application/controllers/routes';
import { env } from './infra/env';
import { connectRabbitMQ } from './infra/rabbitmq/rabbit-mq';

export const app = fastify();

app.register(appRoutes);
app.register(connectRabbitMQ);
app.register(fastifyRedis, {
  url: env.REDIS_URL,
});

app.register(appRoutes, { prefix: '/api' });
app.register(fastifyView, {
  engine: {
    handlebars: Handlebars,
  },
  layout: 'src/views/index.hbs',
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    });
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});
