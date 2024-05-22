import { Query } from '@ducen-services/shared';

export class ListPatientAppointmentsQuery extends Query {
  constructor(
    public patientId: string,
    public limit: number,
    public offset: number,
  ) {
    super();
  }
}
