import { CacheStore, Nullable } from '@shared/core';
import { RedisConnection } from './RedisConnection';

export class RedisCacheStore implements CacheStore {
  constructor(private readonly connection: RedisConnection) {}
  protected get client() {
    return this.connection.getConnection();
  }
  async set(key: string, payload: any, time: number): Promise<boolean> {
    const payloadStringify = JSON.stringify(payload);
    const result = await this.client.setEx(key, time, payloadStringify);
    return result ? true : false;
  }

  async get(key: string): Promise<Nullable<any>> {
    const stringVal = await this.client.get(key);
    if (!stringVal) return null;
    const parsedVal = JSON.parse(stringVal);
    return parsedVal;
  }

  async delete(key: string): Promise<boolean> {
    const result = await this.client.del(key);
    return result ? true : false;
  }

  async getOrSet<T>(key: string, transaction: Promise<any>, expireIn = 60 * 60): Promise<Nullable<T>> {
    let response: any;
    response = await this.get(key);
    if (!response) {
      response = await transaction;
      await this.set(key, response, expireIn);
    }
    return response;
  }
}
