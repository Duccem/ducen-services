import { Command, Primitives } from '@ducen-services/shared';
import { User } from '../../domain/User';

export class UserRegisterCommand extends Command {
  readonly user: Primitives<User>;
  constructor(user: Primitives<User>) {
    super();
    this.user = user;
  }
}
