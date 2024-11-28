import { FetchBenefitsService } from '../../infra/api/fetch-benefits.service';
import { GenerateTokenService } from '../../infra/api/generate-token.service';
import { RedisService } from '../../infra/database/redis/redis.service';
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
      throw new Error('Token not found');
    }

    const benefits = await this.fetchBenefitsService.fetchBenefits(
      taxId,
      token,
    );

    const data = benefits?.map((benefit) => {
      return {
        tax_id: taxId,
        number: benefit.number,
        type_code: benefit.type_code,
      };
    });

    await this.redisService.save(taxId, JSON.stringify(data));

    await this.sendQueueService.execute(taxId, benefits);
  }
}
