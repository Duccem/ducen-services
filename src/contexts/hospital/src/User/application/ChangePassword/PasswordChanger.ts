import { SearchUserByIdCriteria } from '../../domain/SearchUserByIdCriteria';
import { UserNotExist } from '../../domain/UserNotExist';
import { UserRepository } from '../../domain/UserRepository';

export class PasswordChanger {
  constructor(private readonly userRepository: UserRepository) {}
  async run(id: string, newPassword: string, oldPassword: string): Promise<void> {
    const user = await this.userRepository.getUserByCriteria(new SearchUserByIdCriteria('id', id));
    if (!user) throw new UserNotExist();

    user.changePassword(newPassword, oldPassword);

    await this.userRepository.save(user.id, user);
  }
}
