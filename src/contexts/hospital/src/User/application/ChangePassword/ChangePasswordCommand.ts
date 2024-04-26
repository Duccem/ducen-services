import { Command } from '@ducen-services/shared';

export class ChangePasswordCommand extends Command {
  constructor(
    public readonly userId: string,
    public readonly newPassword: string,
    public readonly oldPassword: string
  ) {
    super();
  }
}
