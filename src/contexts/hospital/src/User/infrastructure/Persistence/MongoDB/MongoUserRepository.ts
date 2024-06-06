import { Criteria, Logger, MongoConnection, MongoRepository, Uuid } from '@ducen-services/shared';
import { User } from '../../../domain/User';
import { UserRepository } from '../../../domain/UserRepository';
import { MongoUserSchema } from './MongoUserSchema';

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(User, connection, logger);
  }
  get schema() {
    return MongoUserSchema;
  }

  async save(id: Uuid, aggregate: User): Promise<void> {
    await this.persist(id.value, aggregate);
  }
  async getUserByCriteria(criteria: Criteria): Promise<User> {
    const user = await this.getOneByCriteria(criteria);
    return user ? User.fromPrimitives(user) : null;
  }

  async listUsersByCriteria(criteria?: Criteria): Promise<User[]> {
    const result = await this.searchByCriteria(criteria);
    return result.map(User.fromPrimitives);
  }
}
