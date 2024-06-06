import { Logger, MongoConnection, MongoRepository, Primitives } from '@ducen-services/shared';
import { Flag } from '../../domain/Flag';
import { FlagRepository } from '../../domain/FlagRepository';
import { MongoFlagSchema } from './MongoFlagSchema';

export class MongoFlagRepository extends MongoRepository<Flag> implements FlagRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(Flag, connection, logger);
  }
  get schema() {
    return MongoFlagSchema;
  }
  async list(): Promise<Flag[]> {
    const results = await this.collection.find<Primitives<Flag>>();
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
