import { Command, CommandHandler, EmailService } from '@ducen/shared';
import { UserRepository } from '../../../User/domain/UserRepository';
import { SendEmailRecoveryCode } from './SendEmailRecoveryCode';
import { SendEmailRecoveryCodeCommand } from './SendEmailRecoveryCodeCommand';

export class SendEmailRecoveryCodeCommandHandler implements CommandHandler<SendEmailRecoveryCodeCommand> {
  private useCase: SendEmailRecoveryCode;
  constructor(repository: UserRepository, emailService: EmailService) {
    this.useCase = new SendEmailRecoveryCode(repository, emailService);
  }

  subscribedTo(): Command {
    return SendEmailRecoveryCodeCommand;
  }

  public async handle(command: SendEmailRecoveryCodeCommand): Promise<void> {
    await this.useCase.run(command.email);
  }
}
