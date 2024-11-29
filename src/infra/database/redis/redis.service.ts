import { FastifyRedis } from '@fastify/redis';

export class RedisService {
  constructor(private readonly client: FastifyRedis) {}

  async save(key: string, value: string): Promise<string> {
    const expiration = 30 * 60;
    return await this.client.set(key, value, 'EX', expiration);
  }

  async get(key: string): Promise<string | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }
}
