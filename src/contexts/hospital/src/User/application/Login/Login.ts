import { Primitives } from '@ducen-services/shared';
import { AuthConfig } from '../../domain/AuthConfig';
import { IdentifyBy } from '../../domain/IdentifyBy';
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
    const user = await this.userRepository.getUserByCriteria(new IdentifyBy('email', username));
    if (!user) throw new UserNotExist();

    user.validatePassword(password);

    return {
      token: user.generateToken(this.authConfig.authKey),
      user: user.toPrimitives(),
    };
  }
}
