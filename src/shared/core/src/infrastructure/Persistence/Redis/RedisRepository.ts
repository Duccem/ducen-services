import { InternalError } from '../../../domain/common/errors/InternalError';
import { Aggregate } from '../../../domain/core/Aggregate';
import { Entity } from '../../../domain/core/Entity';
import { Logger } from '../../../domain/core/Logger';
import { Constructor } from '../../../domain/types/Constructor';
import { RedisConnection } from './RedisConnection';

export class RedisRepository<T extends Aggregate | Entity> {
  constructor(
    protected entity: Constructor<T>,
    protected connection: RedisConnection,
    protected logger: Logger,
  ) {}

  protected get model() {
    return this.entity.name.toLowerCase();
  }

  protected get client() {
    return this.connection.getConnection();
  }

  async search(key: string) {
    try {
      const rawStringValue = await this.client.get(key);
      if (!rawStringValue) {
        return null;
      }
      return JSON.parse(rawStringValue);
    } catch (error) {
      this.logger.error(`Error searching by key: ${key}`);
      throw new InternalError(`Error retrieving the data`);
    }
  }

  async persist(data: any, key: string, ttl: number) {
    try {
      const stringifiedData = JSON.stringify(data);
      await this.client.setEx(key, ttl, stringifiedData);
    } catch (error) {
      this.logger.error(`Error creating key: ${key} with data: ${data}`);
      throw new InternalError(`Error creating record`);
    }
  }

  async delete(key: string) {
    try {
      await this.client.del(key);
    } catch (error) {
      this.logger.error(`Error deleting key: ${key}`);
      throw new InternalError(`Error deleting record`);
    }
  }
}
