import { Query } from '@ducen/shared';

export class GetPatientDiagnosticQuery extends Query {
  constructor(public patientId: string) {
    super();
  }
}
