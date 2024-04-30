import { UserSearcher } from '../../../User/application/UserSearcher/UserSearcher';
import { UserNotExist } from '../../../User/domain/UserNotExist';
import { MedicalDocument } from '../../domain/MedicalDocument';
import { MedicalDocumentRepository } from '../../domain/MedicalDocumentRepository';

export class UserDocumentsGetter {
  constructor(
    private readonly repository: MedicalDocumentRepository,
    private readonly userSearcher: UserSearcher,
  ) {}

  async run(userId: string): Promise<MedicalDocument[]> {
    const user = await this.userSearcher.run('id', userId);
    if (!user) {
      throw new UserNotExist();
    }
    return this.repository.findByUserId(user.id);
  }
}
