import { Logger, MongoConnection, MongoRepository, Primitives } from '@ducen-services/shared';
import { Flag } from '../domain/Flag';
import { FlagRepository } from '../domain/FlagRepository';

export class MongoFlagRepository extends MongoRepository<Flag> implements FlagRepository {
  async index(): Promise<void> {
    await this.collection.createIndex({ id: 1 }, { unique: true });
  }
  constructor(connection: MongoConnection, logger: Logger) {
    super(Flag, connection, logger);
  }
  async list(): Promise<Flag[]> {
    const results: Array<Primitives<Flag>> = (await this.collection.find().toArray()) as any;
    return results.map((result) => Flag.fromPrimitives(result));
  }
  async create(flag: Flag): Promise<void> {
    return await this.persist(flag.id.value, flag);
  }
  async getFlag(name: string): Promise<Flag> {
    const flag = await this.collection.findOne<Primitives<Flag>>({
      name,
    });
    return flag ? Flag.fromPrimitives(flag) : null;
  }
}
