import { Query } from '@ducen/shared';

export class GetNotesQuery extends Query {
  constructor(public patientId: string) {
    super();
  }
}
