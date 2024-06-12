import { SearchUserByIdCriteria } from '../../domain/SearchUserByIdCriteria';
import { UserNotExist } from '../../domain/UserNotExist';
import { UserRepository } from '../../domain/UserRepository';

export class RecoveryPassword {
  constructor(private readonly userRepository: UserRepository) {}

  async run(email: string): Promise<void> {
    const user = await this.userRepository.getUserByCriteria(new SearchUserByIdCriteria('email', email));
    if (!user) throw new UserNotExist();
  }
}
