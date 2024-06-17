import { Command, CommandHandler } from '@ducen-services/shared';
import { UserRepository } from '../../../..';
import { ProfileImageUploader } from './ProfileImageUploader';
import { UploadProfileImageCommand } from './UploadProfileImageCommand';
import { StoreService } from '../../../MedicalDocument/domain/StoreService';

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
