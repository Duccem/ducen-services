import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import { SearchUserByIdCriteria } from '../../domain/criteria/SearchUserByIdCriteria';
import { UserNotExist } from '../../domain/errors/UserNotExist';

export class UserSearcher {
  constructor(private repository: UserRepository) {}

  async run(id: string): Promise<User> {
    const user = await this.repository.getUserByCriteria(new SearchUserByIdCriteria(id));
    if (!user) {
      throw new UserNotExist();
    }
    return user;
  }
}
