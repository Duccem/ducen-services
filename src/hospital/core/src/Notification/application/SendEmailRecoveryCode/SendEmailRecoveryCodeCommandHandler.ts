import { Command, CommandHandler } from '@ducen/shared';
import { UserRepository } from '../../../User/domain/UserRepository';
import { NotificationRepository } from '../../domain/NotificationRepository';
import { EmailNotifier } from '../../domain/Notifier';
import { SendEmailRecoveryCode } from './SendEmailRecoveryCode';
import { SendEmailRecoveryCodeCommand } from './SendEmailRecoveryCodeCommand';

export class SendEmailRecoveryCodeCommandHandler implements CommandHandler<SendEmailRecoveryCodeCommand> {
  private useCase: SendEmailRecoveryCode;
  constructor(repository: NotificationRepository, userRepository: UserRepository, notifier: EmailNotifier) {
    this.useCase = new SendEmailRecoveryCode(repository, userRepository, notifier);
  }

  subscribedTo(): Command {
    return SendEmailRecoveryCodeCommand;
  }

  public async handle(command: SendEmailRecoveryCodeCommand): Promise<void> {
    await this.useCase.run(command.email);
  }
}
