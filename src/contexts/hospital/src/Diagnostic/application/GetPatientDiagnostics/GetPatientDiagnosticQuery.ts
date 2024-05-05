import { Query } from '@ducen-services/shared';

export class GetPatientDiagnosticQuery extends Query {
  constructor(public patientId: string) {
    super();
  }
}
