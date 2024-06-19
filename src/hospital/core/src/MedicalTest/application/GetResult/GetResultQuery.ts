import { Query } from '@ducen/shared';

export class GetResultQuery extends Query {
  constructor(public patientId: string) {
    super();
  }
}
