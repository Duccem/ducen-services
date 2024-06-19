import { Query, QueryHandler } from '@ducen/shared';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { PatientRepository } from '../../../Patient/domain/PatientRepository';
import { MedicalTest } from '../../domain/MedicalTest';
import { MedicalTestRepository } from '../../domain/MedicalTestRepository';
import { GetResultQuery } from './GetResultQuery';
import { ResultGetter } from './ResultGetter';

export class GetResultQueryHandler implements QueryHandler<GetResultQuery> {
  private getter: ResultGetter;
  constructor(repository: MedicalTestRepository, patientRepository: PatientRepository) {
    this.getter = new ResultGetter(repository, new PatientSearcher(patientRepository));
  }

  subscribedTo(): Query {
    return GetResultQuery;
  }

  public async handle(query: GetResultQuery): Promise<MedicalTest[]> {
    return await this.getter.run(query.patientId);
  }
}
