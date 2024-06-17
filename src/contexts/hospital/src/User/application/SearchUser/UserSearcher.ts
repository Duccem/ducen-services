import { SearchUserByIdCriteria } from '../../domain/SearchUserByIdCriteria';
import { User } from '../../domain/User';
import { UserNotExist } from '../../domain/UserNotExist';
import { UserRepository } from '../../domain/UserRepository';

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
