import { StoreService } from '../../../MedicalDocument/domain/StoreService';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';

export class ProfileImageUploader {
  constructor(
    private readonly repository: UserRepository,
    private readonly storeService: StoreService,
  ) {}

  async run(image: Buffer, user: User, metadata: { type: string; fileName: string }) {
    const fileName = `${user.id.toString()}/profile-images/${metadata.fileName}.${metadata.type}`;
    const response = await this.storeService.upload(image, fileName);

    user.updateProfileImage(response.url);

    await this.repository.save(user.id, user);
  }
}
