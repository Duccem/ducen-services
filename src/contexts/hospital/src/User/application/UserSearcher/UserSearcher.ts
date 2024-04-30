import { IdentifyBy } from '../../domain/IdentifyBy';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';

export class UserSearcher {
  constructor(private repository: UserRepository) {}

  async run(field: string, value: string): Promise<User> {
    return await this.repository.getUserByCriteria(new IdentifyBy(field, value));
  }
}
