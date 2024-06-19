import { Query } from '@ducen/shared';

export class GetFlagQuery extends Query {
  readonly id: string;
  constructor(id: string) {
    super();
    this.id = id;
  }
}
