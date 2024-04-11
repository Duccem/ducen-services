import { Command } from '@ducen/core';

export class RecoveryPasswordCommand extends Command {
  constructor(public readonly email: string) {
    super();
  }
}
