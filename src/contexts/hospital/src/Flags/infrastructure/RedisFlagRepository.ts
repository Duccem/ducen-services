import { Logger, Primitives, RedisConnection, RedisRepository } from '@ducen-services/shared';
import { Flag } from '../domain/Flag';
import { FlagRepository } from '../domain/FlagRepository';

export class RedisFlagRepository extends RedisRepository<Flag> implements FlagRepository {
  constructor(
    connection: RedisConnection,
    protected readonly dbRepository: FlagRepository,
    logger: Logger,
  ) {
    super(Flag, connection, logger);
  }
  async getFlag(name: string): Promise<Flag> {
    const key = `${this.model}:${name}`;
    let flag = await this.search(key);
    if (!flag) {
      flag = await this.dbRepository.getFlag(name);
      await this.persist(flag, key, 60);
    }
    return flag ? Flag.fromPrimitives(flag) : null;
  }
  async list(): Promise<Flag[]> {
    const key = `${this.model}:all`;
    const flags = await this.search(key);
    if (!flags) {
      const flags = await this.dbRepository.list();
      await this.persist(Flag.toArray(flags), `${this.model}:all`, 60);
      return flags;
    }
    return flags.map((flag: Primitives<Flag>) => Flag.fromPrimitives(flag));
  }

  async create(flag: Flag): Promise<void> {
    await this.dbRepository.create(flag);
  }
}
