import { Criteria, Filters, Operator } from '@ducen-services/shared';

export class GetById extends Criteria {
  constructor(id: string) {
    super(
      Filters.fromValues([
        new Map([
          ['field', 'id'],
          ['operator', Operator.EQUAL],
          ['value', id],
        ]),
      ]),
    );
  }
}
