import { ElasticsearchService } from '../../../infra/elasticsearch/elasticsearch.service';
import { SearchBenefitsService } from '../search-benefits.service';

export function makeSearchBenefitsService() {
  const elasticsearchService = new ElasticsearchService();
  const searchBenefitsService = new SearchBenefitsService(elasticsearchService);

  return searchBenefitsService;
}
