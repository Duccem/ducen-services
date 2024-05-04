import { Query } from '@ducen-services/shared';

export class GetPatientTreatmentsQuery extends Query {
  constructor(public patientId: string) {
    super();
  }
}
