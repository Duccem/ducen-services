import { SearchUserByEmailCriteria } from '../../domain/SearchUserByEmailCriteria';
import { UserNotExist } from '../../domain/UserNotExist';
import { UserRepository } from '../../domain/UserRepository';

export class RecoveryPassword {
  constructor(private readonly userRepository: UserRepository) {}

  async run(email: string): Promise<void> {
    const user = await this.userRepository.getUserByCriteria(new SearchUserByEmailCriteria(email));
    if (!user) throw new UserNotExist();
  }
}
