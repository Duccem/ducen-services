import { Query } from '@ducen/shared';

export class GetUserDocumentsQuery extends Query {
  constructor(public readonly userId: string) {
    super();
  }
}
