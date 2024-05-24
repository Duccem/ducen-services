import { Command } from '@ducen-services/shared';

export class SendEmailRecoveryCodeCommand extends Command {
  constructor(public readonly email: string) {
    super();
  }
}
