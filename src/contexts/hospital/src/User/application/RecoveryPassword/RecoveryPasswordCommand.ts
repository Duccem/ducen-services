import { Command } from '@ducen-services/shared';

export class RecoveryPasswordCommand extends Command {
  constructor(public readonly email: string) {
    super();
  }
}
