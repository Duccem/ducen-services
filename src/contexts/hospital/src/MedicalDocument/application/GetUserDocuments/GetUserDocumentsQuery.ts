import { Query } from '@ducen-services/shared';

export class GetUserDocumentsQuery extends Query {
  constructor(public readonly userId: string) {
    super();
  }
}
