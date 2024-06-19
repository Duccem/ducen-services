import { Query, QueryHandler } from '@ducen/shared';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { PatientRepository } from '../../../Patient/domain/PatientRepository';
import { TreatmentRepository } from '../../domain/TreatmentRepository';
import { GetPatientTreatmentsQuery } from './GetPatientTreatmentsQuery';
import { PatientTreatmentsGetter } from './PatientTreatmentsGetter';

export class GetPatientTreatmentsQueryHandler implements QueryHandler<GetPatientTreatmentsQuery> {
  private searcher: PatientTreatmentsGetter;
  constructor(repository: TreatmentRepository, patientRepository: PatientRepository) {
    this.searcher = new PatientTreatmentsGetter(repository, new PatientSearcher(patientRepository));
  }

  subscribedTo(): Query {
    return GetPatientTreatmentsQuery;
  }

  public async handle(query: GetPatientTreatmentsQuery): Promise<any> {
    return await this.searcher.run(query.patientId);
  }
}
