import { Command, CommandHandler } from '@ducen/shared';
import { UserRepository } from '../../../..';
import { StoreService } from '../../../MedicalDocument/domain/StoreService';
import { ProfileImageUploader } from './ProfileImageUploader';
import { UploadProfileImageCommand } from './UploadProfileImageCommand';

export class UploadProfileImageCommandHandler implements CommandHandler<UploadProfileImageCommand> {
  private uploader: ProfileImageUploader;
  constructor(repository: UserRepository, service: StoreService) {
    this.uploader = new ProfileImageUploader(repository, service);
  }

  subscribedTo(): Command {
    return UploadProfileImageCommand;
  }

  public async handle(command: UploadProfileImageCommand): Promise<void> {
    await this.uploader.run(command.image, command.user, command.metadata);
  }
}
