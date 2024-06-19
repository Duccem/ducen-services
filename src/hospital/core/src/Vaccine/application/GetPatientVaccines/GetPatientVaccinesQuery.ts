import { Query } from '@ducen/shared';

export class GetPatientVaccinesQuery extends Query {
  constructor(public patientId: string) {
    super();
  }
}
