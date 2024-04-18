import { Command, CommandHandler } from '@ducen/core';
import { UserRepository } from '../../domain/UserRepository';
import { ChangePasswordCommand } from './ChangePasswordCommand';
import { PasswordChanger } from './PasswordChanger';

export class ChangePasswordHandler implements CommandHandler<ChangePasswordCommand> {
  private passwordChanger: PasswordChanger;
  constructor(userRepository: UserRepository) {
    this.passwordChanger = new PasswordChanger(userRepository);
  }
  subscribedTo(): Command {
    return ChangePasswordCommand;
  }

  async handle({ userId, newPassword, oldPassword }: ChangePasswordCommand): Promise<void> {
    await this.passwordChanger.run(userId, newPassword, oldPassword);
  }
}
