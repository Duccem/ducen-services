import { Query } from '@ducen/core';

export class GetFlagQuery extends Query {
  readonly id: string;
  constructor(id: string) {
    super();
    this.id = id;
  }
}
