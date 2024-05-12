import { Primitives } from '@ducen-services/shared';
import { IdentifyBy } from '../../domain/IdentifyBy';
import { UserNotExist } from '../../domain/UserNotExist';
import { UserRepository } from '../../domain/UserRepository';
import { User } from '../../domain/User';

export class Login {
  constructor(private userRepository: UserRepository) {}
  async run(
    username: string,
    password: string,
  ): Promise<{
    token: string;
    user: Primitives<User>;
  }> {
    const user = await this.userRepository.getUserByCriteria(new IdentifyBy('email', username));
    if (!user) throw new UserNotExist();

    user.validatePassword(password);

    return {
      token: user.generateToken(),
      user: user.toPrimitives(),
    };
  }
}
