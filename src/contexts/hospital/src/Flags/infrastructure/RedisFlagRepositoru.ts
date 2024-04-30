import { RedisRepository } from '@ducen-services/shared';
import { Flag } from '../domain/Flag';
import { FlagRepository } from '../domain/FlagRepository';

export class RedisFlagRepository extends RedisRepository<Flag> implements FlagRepository {
  async getFlag(name: string): Promise<Flag> {
    const result = await this.search(`${this.model}:${name}`);
    if (!result) {
      return null;
    }
    return Flag.fromPrimitives(result);
  }
  async list(): Promise<Flag[]> {
    const flags = await this.client.keys(`${this.model}:*`);
    const result = [];
    for (const key of flags) {
      const flag = await this.search(key);
      result.push(Flag.fromPrimitives(flag));
    }
    return result;
  }

  async create(flag: Flag): Promise<void> {
    await this.persist(flag, `${this.model}:${flag.name.value}`, 60);
  }
}
