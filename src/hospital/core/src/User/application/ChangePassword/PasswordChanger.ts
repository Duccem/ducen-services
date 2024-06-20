import { SearchUserByIdCriteria } from '../../domain/criteria/SearchUserByIdCriteria';
import { UserNotExist } from '../../domain/errors/UserNotExist';
import { UserRepository } from '../../domain/UserRepository';

export class PasswordChanger {
  constructor(private readonly userRepository: UserRepository) {}
  async run(id: string, newPassword: string, oldPassword: string): Promise<void> {
    const user = await this.userRepository.getUserByCriteria(new SearchUserByIdCriteria(id));
    if (!user) throw new UserNotExist();

    user.changePassword(newPassword, oldPassword);

    await this.userRepository.save(user.id, user);
  }
}
