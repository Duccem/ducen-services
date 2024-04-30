import { Query, QueryHandler } from '@ducen-services/shared';
import { UserSearcher } from '../../../User/application/UserSearcher/UserSearcher';
import { UserRepository } from '../../../User/domain/UserRepository';
import { MedicalDocument } from '../../domain/MedicalDocument';
import { MedicalDocumentRepository } from '../../domain/MedicalDocumentRepository';
import { GetUserDocumentsQuery } from './GetUserDocumentsQuery';
import { UserDocumentsGetter } from './UserDocumentsGetter';

export class GetUserDocumentsQueryHandler implements QueryHandler<GetUserDocumentsQuery> {
  private userDocumentsGetter: UserDocumentsGetter;
  constructor(repository: MedicalDocumentRepository, userRepo: UserRepository) {
    this.userDocumentsGetter = new UserDocumentsGetter(repository, new UserSearcher(userRepo));
  }

  subscribedTo(): Query {
    return GetUserDocumentsQuery;
  }

  public async handle(query: GetUserDocumentsQuery): Promise<MedicalDocument[]> {
    return await this.userDocumentsGetter.run(query.userId);
  }
}
