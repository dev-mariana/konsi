import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFetchBenefitsService } from '../../domain/services/factories/make-fetch-benefits-service';
import { RedisService } from '../../infra/database/redis/redis.service';

export async function consumerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const consumerParamsSchema = z.object({
    taxId: z.string().min(11),
  });

  const { taxId } = consumerParamsSchema.parse(request.query);

  try {
    const redisService = new RedisService(request.server.redis);
    const fetchBenefitsService = makeFetchBenefitsService(redisService);

    const data = await fetchBenefitsService.execute(taxId);

    return reply.status(200).send(data);
  } catch (error) {
    console.error(error);
  }
}
