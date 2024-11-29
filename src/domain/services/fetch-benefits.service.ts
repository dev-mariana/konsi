import { RedisService } from '../../infra/database/redis/redis.service';
import { Message } from '../entities/message';
import { ConsumerQueueService } from './consumer-queue.service';

export class FetchBenefitsService {
  constructor(
    private readonly redisService: RedisService,
    private readonly consumerQueueService: ConsumerQueueService,
  ) {}

  async execute(taxId: string): Promise<Message[]> {
    const data = await this.consumerQueueService.execute();

    const filteredItem = data.filter((item) => item.taxId === taxId);

    if (filteredItem.length === 0) {
      return [];
    }

    const transformedData = await Promise.all(
      filteredItem.map(async (item) => {
        const savedBenefits = await this.redisService.get(item.taxId);

        return {
          taxId: item.taxId,
          benefits: savedBenefits,
        } as unknown as Message;
      }),
    );

    return transformedData;
  }
}
