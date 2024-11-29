import { RedisService } from '../../infra/database/redis/redis.service';
import { ElasticsearchService } from '../../infra/elasticsearch/elasticsearch.service';
import { Message } from '../entities/message';
import { ConsumerQueueService } from './consumer-queue.service';

export class FetchBenefitsService {
  constructor(
    private readonly redisService: RedisService,
    private readonly consumerQueueService: ConsumerQueueService,
    private readonly elasticsearchService: ElasticsearchService,
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

        await this.elasticsearchService.indexData('benefits', taxId, {
          taxId: taxId,
          benefits: savedBenefits as unknown as Record<string, any>,
        });

        return {
          taxId: item.taxId,
          benefits: savedBenefits,
        } as unknown as Message;
      }),
    );

    return transformedData;
  }
}
