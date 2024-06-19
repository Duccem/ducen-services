import { Query } from '@ducen/shared';

export class GetPatientTreatmentsQuery extends Query {
  constructor(public patientId: string) {
    super();
  }
}
