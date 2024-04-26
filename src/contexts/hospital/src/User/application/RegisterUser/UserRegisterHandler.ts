import { Command, CommandHandler, EventBus } from '@ducen-services/shared';
import { UserRepository } from '../../domain/UserRepository';
import { UserRegisterCommand } from './UserRegisterCommand';
import { UserRegistrar } from './UserRegistrar';

export class UserRegisterHandler implements CommandHandler<UserRegisterCommand> {
  private userRegistrar: UserRegistrar;
  constructor(repository: UserRepository, eventBus: EventBus) {
    this.userRegistrar = new UserRegistrar(repository, eventBus);
  }
  subscribedTo(): Command {
    return UserRegisterCommand;
  }
  async handle({ user }: UserRegisterCommand): Promise<void> {
    await this.userRegistrar.register(user);
  }
}
