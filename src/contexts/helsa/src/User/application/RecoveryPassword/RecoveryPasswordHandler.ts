import { Command, CommandHandler, EmailSender } from '@ducen/core';
import { UserRepository } from '../../domain/UserRepository';
import { RecoveryPassword } from './RecoveryPassword';
import { RecoveryPasswordCommand } from './RecoveryPasswordCommand';

export class RecoveryPasswordHandler implements CommandHandler<RecoveryPasswordCommand> {
  private readonly recoveryPassword: RecoveryPassword;
  constructor(userRepository: UserRepository, mailSender: EmailSender, baseUrl: string) {
    this.recoveryPassword = new RecoveryPassword(userRepository, mailSender, baseUrl);
  }
  subscribedTo(): Command {
    return RecoveryPasswordCommand;
  }

  async handle({ email }: RecoveryPasswordCommand): Promise<void> {
    await this.recoveryPassword.run(email);
  }
}
