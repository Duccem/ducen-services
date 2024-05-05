import { Query, QueryHandler } from '@ducen-services/shared';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { PatientRepository } from '../../../Patient/domain/PatientRepository';
import { VaccineRepository } from '../../domain/VaccineRepository';
import { GetPatientVaccinesQuery } from './GetPatientVaccinesQuery';
import { PatientVaccinesGetter } from './PatientVaccinesGetter';

export class GetPatientVaccinesQueryHandler implements QueryHandler<GetPatientVaccinesQuery> {
  private searcher: PatientVaccinesGetter;
  constructor(vaccineRepository: VaccineRepository, patientRepository: PatientRepository) {
    this.searcher = new PatientVaccinesGetter(vaccineRepository, new PatientSearcher(patientRepository));
  }

  subscribedTo(): Query {
    return GetPatientVaccinesQuery;
  }

  public async handle(query: GetPatientVaccinesQuery): Promise<any> {
    return await this.searcher.run(query.patientId);
  }
}
