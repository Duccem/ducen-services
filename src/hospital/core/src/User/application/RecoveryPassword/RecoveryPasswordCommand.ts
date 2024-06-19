import { Command } from '@ducen/shared';

export class RecoveryPasswordCommand extends Command {
  constructor(public readonly email: string) {
    super();
  }
}
