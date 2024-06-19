import { Query, QueryHandler } from '@ducen/shared';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { PatientRepository } from '../../../Patient/domain/PatientRepository';
import { DiagnosticRepository } from '../../domain/DiagnosticRepository';
import { GetPatientDiagnosticQuery } from './GetPatientDiagnosticQuery';
import { PatientDiagnosticsGetter } from './PatientDiagnosticsGetter';

export class GetPatientDiagnosticQueryHandler implements QueryHandler<GetPatientDiagnosticQuery> {
  private getter: PatientDiagnosticsGetter;
  constructor(diagnosticRepository: DiagnosticRepository, patientRepository: PatientRepository) {
    this.getter = new PatientDiagnosticsGetter(diagnosticRepository, new PatientSearcher(patientRepository));
  }

  subscribedTo(): Query {
    return GetPatientDiagnosticQuery;
  }

  public async handle(query: GetPatientDiagnosticQuery): Promise<any> {
    return this.getter.run(query.patientId);
  }
}
