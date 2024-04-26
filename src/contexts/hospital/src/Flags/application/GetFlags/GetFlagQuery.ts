import { Query } from '@ducen-services/shared';

export class GetFlagQuery extends Query {
  readonly id: string;
  constructor(id: string) {
    super();
    this.id = id;
  }
}
