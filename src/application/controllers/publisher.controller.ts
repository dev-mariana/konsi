import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { SaveBenefitsService } from '../../domain/services/save-benefits.service';
import { SendQueueService } from '../../domain/services/send-queue.service';
import { FetchBenefitsService } from '../../infra/api/fetch-benefits.service';
import { GenerateTokenService } from '../../infra/api/generate-token.service';
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
    const generateTokenService = new GenerateTokenService();
    const fetchBenefitsService = new FetchBenefitsService();
    const sendQueueService = new SendQueueService();
    const saveBenefitsService = new SaveBenefitsService(
      generateTokenService,
      fetchBenefitsService,
      redisService,
      sendQueueService,
    );

    await saveBenefitsService.execute(tax_id);

    return reply.status(201).send({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
  }
}
