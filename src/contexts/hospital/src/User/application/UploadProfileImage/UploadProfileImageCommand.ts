import { Command } from '@ducen-services/shared';
import { User } from '../../../..';

export class UploadProfileImageCommand extends Command {
  constructor(
    public readonly image: Buffer,
    public readonly user: User,
    public readonly metadata: { type: string; fileName: string },
  ) {
    super();
  }
}
