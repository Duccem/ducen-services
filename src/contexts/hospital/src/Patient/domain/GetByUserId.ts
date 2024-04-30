import { Criteria, Filters, Operator } from '@ducen-services/shared';

export class GetByUserId extends Criteria {
  constructor(userId: string) {
    super(
      Filters.fromValues([
        new Map([
          ['field', 'userId'],
          ['operator', Operator.EQUAL],
          ['value', userId],
        ]),
      ]),
    );
  }
}
