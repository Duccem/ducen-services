import { Command, CommandHandler } from '@ducen-services/shared';
import { UserRepository } from '../../domain/UserRepository';
import { RecoveryPassword } from './RecoveryPassword';
import { RecoveryPasswordCommand } from './RecoveryPasswordCommand';

export class RecoveryPasswordHandler implements CommandHandler<RecoveryPasswordCommand> {
  private readonly recoveryPassword: RecoveryPassword;
  constructor(userRepository: UserRepository) {
    this.recoveryPassword = new RecoveryPassword(userRepository);
  }
  subscribedTo(): Command {
    return RecoveryPasswordCommand;
  }

  async handle({ email }: RecoveryPasswordCommand): Promise<void> {
    await this.recoveryPassword.run(email);
  }
}
