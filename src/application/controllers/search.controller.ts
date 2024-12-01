import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeFetchBenefitsService } from '../../domain/services/factories/make-fetch-benefits-service';
import { makeSearchBenefitsService } from '../../domain/services/factories/make-search-benefits-service';
import { RedisService } from '../../infra/database/redis/redis.service';

export async function searchController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchParamsSchema = z.object({
    taxId: z.string().min(11),
  });

  const { taxId } = searchParamsSchema.parse(request.query);

  try {
    const redisService = new RedisService(request.server.redis);
    const fetchBenefitsService = makeFetchBenefitsService(redisService);
    const searchFetchBenefitsService = makeSearchBenefitsService();

    await fetchBenefitsService.execute(taxId);

    const response = await searchFetchBenefitsService.execute(taxId);

    const benefits = response.hits.hits.map((hits) => hits._source);

    return reply.status(200).send(benefits);
  } catch (error) {
    return reply.status(500).send({ message: error.message });
  }
}
