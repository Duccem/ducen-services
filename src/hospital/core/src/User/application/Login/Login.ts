import { Primitives } from '@ducen/shared';
import { AuthConfig } from '../../domain/AuthConfig';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import { SearchUserByEmailCriteria } from '../../domain/criteria/SearchUserByEmailCriteria';
import { UserNotExist } from '../../domain/errors/UserNotExist';

export class Login {
  constructor(
    private userRepository: UserRepository,
    private authConfig: AuthConfig,
  ) {}
  async run(
    username: string,
    password: string,
  ): Promise<{
    token: string;
    user: Primitives<User>;
  }> {
    const user = await this.userRepository.getUserByCriteria(new SearchUserByEmailCriteria(username));
    if (!user) throw new UserNotExist();

    user.validatePassword(password);

    return {
      token: user.generateToken(this.authConfig.authKey),
      user: user.toPrimitives(),
    };
  }
}
