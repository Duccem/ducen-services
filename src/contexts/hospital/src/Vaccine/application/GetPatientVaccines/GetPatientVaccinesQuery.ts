import { Query } from '@ducen-services/shared';

export class GetPatientVaccinesQuery extends Query {
  constructor(public patientId: string) {
    super();
  }
}
