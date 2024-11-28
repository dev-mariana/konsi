import { FastifyRedis } from '@fastify/redis';

export class RedisService {
  constructor(private readonly client: FastifyRedis) {}

  async save(key: string, value: string): Promise<string> {
    return await this.client.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }
}
