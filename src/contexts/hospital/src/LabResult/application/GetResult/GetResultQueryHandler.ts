import { Query, QueryHandler } from '@ducen-services/shared';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { PatientRepository } from '../../../Patient/domain/PatientRepository';
import { LabResult } from '../../domain/LabResult';
import { LabResultRepository } from '../../domain/LabResultRepository';
import { GetResultQuery } from './GetResultQuery';
import { ResultGetter } from './ResultGetter';

export class GetResultQueryHandler implements QueryHandler<GetResultQuery> {
  private getter: ResultGetter;
  constructor(repository: LabResultRepository, patientRepository: PatientRepository) {
    this.getter = new ResultGetter(repository, new PatientSearcher(patientRepository));
  }

  subscribedTo(): Query {
    return GetResultQuery;
  }

  public async handle(query: GetResultQuery): Promise<LabResult[]> {
    return await this.getter.run(query.patientId);
  }
}
