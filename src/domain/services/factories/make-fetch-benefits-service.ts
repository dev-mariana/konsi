import { ElasticsearchService } from '../../../infra/elasticsearch/elasticsearch.service';
import { ConsumerQueueService } from '../consumer-queue.service';
import { FetchBenefitsService } from '../fetch-benefits.service';

export function makeFetchBenefitsService(redisService) {
  const consumerQueueService = new ConsumerQueueService();
  const elasticsearchService = new ElasticsearchService();
  const fetchBenefitsService = new FetchBenefitsService(
    redisService,
    consumerQueueService,
    elasticsearchService,
  );

  return fetchBenefitsService;
}
