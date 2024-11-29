import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ConsumerQueueService } from '../../domain/services/consumer-queue.service';
import { FetchBenefitsService } from '../../domain/services/fetch-benefits.service';
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
    const consumerQueueService = new ConsumerQueueService();
    const fetchBenefitsService = new FetchBenefitsService(
      redisService,
      consumerQueueService,
    );

    const data = await fetchBenefitsService.execute(taxId);

    return reply.status(200).send(data);
  } catch (error) {
    console.error(error);
  }
}
