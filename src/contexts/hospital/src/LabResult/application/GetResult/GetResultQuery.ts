import { Query } from '@ducen-services/shared';

export class GetResultQuery extends Query {
  constructor(public patientId: string) {
    super();
  }
}
