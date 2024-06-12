import { Primitives } from '@ducen-services/shared';
import { AuthConfig } from '../../domain/AuthConfig';
import { SearchUserByIdCriteria } from '../../domain/SearchUserByIdCriteria';
import { User } from '../../domain/User';
import { UserNotExist } from '../../domain/UserNotExist';
import { UserRepository } from '../../domain/UserRepository';

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
    const user = await this.userRepository.getUserByCriteria(new SearchUserByIdCriteria('email', username));
    if (!user) throw new UserNotExist();

    user.validatePassword(password);

    return {
      token: user.generateToken(this.authConfig.authKey),
      user: user.toPrimitives(),
    };
  }
}
