import { AuthService } from '../../domain/AuthService';
import { IdentifyBy } from '../../domain/IdentifyBy';
import { UserNotExist } from '../../domain/UserNotExist';
import { UserRepository } from '../../domain/UserRepository';

export class Login {
  constructor(private userRepository: UserRepository, private authService: AuthService) {}
  async run(username: string, password: string): Promise<any> {
    const user = await this.userRepository.getUserByCriteria(new IdentifyBy('email', username));
    if (!user) throw new UserNotExist();

    user.validatePassword(password);

    return {
      token: this.authService.generateToken(user),
      user: user.toPrimitives(),
    };
  }
}
