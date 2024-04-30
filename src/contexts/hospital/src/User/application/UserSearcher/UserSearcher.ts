import { IdentifyBy } from '../../domain/IdentifyBy';
import { User } from '../../domain/User';
import { UserNotExist } from '../../domain/UserNotExist';
import { UserRepository } from '../../domain/UserRepository';

export class UserSearcher {
  constructor(private repository: UserRepository) {}

  async run(field: string, value: string): Promise<User> {
    const user = await this.repository.getUserByCriteria(new IdentifyBy(field, value));
    if (!user) {
      throw new UserNotExist();
    }
    return user;
  }
}
