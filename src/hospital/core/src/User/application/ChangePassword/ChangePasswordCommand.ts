import { Command } from '@ducen/shared';

export class ChangePasswordCommand extends Command {
  constructor(
    public readonly userId: string,
    public readonly newPassword: string,
    public readonly oldPassword: string
  ) {
    super();
  }
}
