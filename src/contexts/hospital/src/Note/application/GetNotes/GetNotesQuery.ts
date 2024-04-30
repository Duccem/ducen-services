import { Query } from '@ducen-services/shared';

export class GetNotesQuery extends Query {
  constructor(public patientId: string) {
    super();
  }
}
