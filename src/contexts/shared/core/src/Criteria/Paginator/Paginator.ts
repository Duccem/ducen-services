import { Limit } from './Limit';
import { Offset } from './Offset';

export class Paginator {
  readonly limit: Limit;
  readonly offset: Offset;

  constructor(limit: Limit, offset: Offset) {
    this.limit = limit;
    this.offset = offset;
  }

  static fromValues(limit?: number, offset?: number) {
    if (!limit && !offset) {
      return Paginator.none();
    }
    return new Paginator(new Limit(limit || 50), new Offset(offset || 0));
  }

  static none(): Paginator {
    return new Paginator(new Limit(1), new Offset(0));
  }
}
