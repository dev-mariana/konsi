import { Client } from '@elastic/elasticsearch';

export class ElasticsearchService {
  private client: Client;

  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_URL,
    });
  }

  async indexData(
    index: string,
    id: string,
    body: Record<string, any>,
  ): Promise<void> {
    try {
      await this.client.index({ index, id, body });

      console.info(`Data indexed successfully for ID: ${id}`);
    } catch (error) {
      console.error('Error connecting to Elasticsearch:', error);
    }
  }

  async search(index: string, body: Record<string, any>): Promise<any> {
    try {
      return await this.client.search({ index, body });
    } catch (error) {
      console.error('Error connecting to Elasticsearch:', error);
    }
  }
}
