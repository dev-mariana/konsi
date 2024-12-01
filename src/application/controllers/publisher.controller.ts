import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeSaveBenefitsService } from '../../domain/services/factories/make-save-benefits-service';
import { RedisService } from '../../infra/database/redis/redis.service';

export async function publisherController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const consumerBodySchema = z.object({
    tax_id: z.string().min(11),
  });

  const { tax_id } = consumerBodySchema.parse(request.body);

  try {
    const redisService = new RedisService(request.server.redis);
    const saveBenefitsService = makeSaveBenefitsService(redisService);

    await saveBenefitsService.execute(tax_id);

    return reply.status(201).send({ message: 'Message sent successfully' });
  } catch (error) {
    return reply.status(500).send({ message: error.message });
  }
}
