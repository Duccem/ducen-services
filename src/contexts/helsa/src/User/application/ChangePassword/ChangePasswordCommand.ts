import { Command } from '@ducen/core';

export class ChangePasswordCommand extends Command {
  constructor(
    public readonly userId: string,
    public readonly newPassword: string,
    public readonly oldPassword: string
  ) {
    super();
  }
}
