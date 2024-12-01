import { ElasticsearchService } from '../../infra/elasticsearch/elasticsearch.service';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

export class SearchBenefitsService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async execute(taxId: string): Promise<any> {
    const response = await this.elasticsearchService.search('benefits', {
      query: {
        match: {
          taxId: taxId,
        },
      },
    });

    if (response.hits.hits.length === 0) {
      throw new ResourceNotFoundError(`Tax id: ${taxId} not found.`);
    }

    return response;
  }
}
