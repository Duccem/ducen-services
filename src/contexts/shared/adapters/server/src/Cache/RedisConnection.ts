import { RedisClientType } from 'redis';

export class RedisConnection {
  constructor(private connection: any) {}
  getConnection(): RedisClientType {
    return this.connection;
  }
}
