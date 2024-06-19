import { Command } from '@ducen/shared';

export class SendEmailRecoveryCodeCommand extends Command {
  constructor(public readonly email: string) {
    super();
  }
}
