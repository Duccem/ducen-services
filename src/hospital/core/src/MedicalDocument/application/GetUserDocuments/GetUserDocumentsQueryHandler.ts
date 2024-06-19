import { Query, QueryHandler } from '@ducen/shared';
import { PatientRepository, PatientSearcher } from '../../../..';
import { MedicalDocument } from '../../domain/MedicalDocument';
import { MedicalDocumentRepository } from '../../domain/MedicalDocumentRepository';
import { GetUserDocumentsQuery } from './GetUserDocumentsQuery';
import { UserDocumentsGetter } from './UserDocumentsGetter';

export class GetUserDocumentsQueryHandler implements QueryHandler<GetUserDocumentsQuery> {
  private userDocumentsGetter: UserDocumentsGetter;
  constructor(repository: MedicalDocumentRepository, patientRepository: PatientRepository) {
    this.userDocumentsGetter = new UserDocumentsGetter(repository, new PatientSearcher(patientRepository));
  }

  subscribedTo(): Query {
    return GetUserDocumentsQuery;
  }

  public async handle(query: GetUserDocumentsQuery): Promise<MedicalDocument[]> {
    return await this.userDocumentsGetter.run(query.userId);
  }
}
