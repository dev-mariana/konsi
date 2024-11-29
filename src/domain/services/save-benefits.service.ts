import { FetchBenefitsService } from '../../infra/api/fetch-benefits.service';
import { GenerateTokenService } from '../../infra/api/generate-token.service';
import { RedisService } from '../../infra/database/redis/redis.service';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { SendQueueService } from './send-queue.service';

export class SaveBenefitsService {
  constructor(
    private readonly generateTokenService: GenerateTokenService,
    private readonly fetchBenefitsService: FetchBenefitsService,
    private readonly redisService: RedisService,
    private readonly sendQueueService: SendQueueService,
  ) {}

  async execute(taxId: string): Promise<void> {
    const token = await this.generateTokenService.generateToken();

    if (!token) {
      throw new ResourceNotFoundError(`${token} not found.`);
    }

    const benefits = await this.fetchBenefitsService.fetchBenefits(
      taxId,
      token,
    );

    await this.redisService.save(taxId, JSON.stringify(benefits));

    await this.sendQueueService.execute(taxId, benefits);
  }
}
