import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ConsumerQueueService } from '../../domain/services/consumer-queue.service';
import { FetchBenefitsService } from '../../domain/services/fetch-benefits.service';
import { GenerateTokenService } from '../../infra/api/generate-token.service';
import { RedisService } from '../../infra/database/redis/redis.service';

export async function consumerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const consumerParamsSchema = z.object({
    taxId: z.string().min(11),
  });

  const { taxId } = consumerParamsSchema.parse(request.query);

  // test this endpoint
  try {
    const redisService = new RedisService(request.server.redis);
    const generateTokenService = new GenerateTokenService();
    const consumerQueueService = new ConsumerQueueService();
    const fetchBenefitsService = new FetchBenefitsService(
      redisService,
      generateTokenService,
      consumerQueueService,
    );

    const data = await fetchBenefitsService.execute(taxId);

    return reply.status(200).send(data);
  } catch (error) {
    console.error(error);
  }
}
