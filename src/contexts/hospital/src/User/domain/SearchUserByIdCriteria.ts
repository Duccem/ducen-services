import { Criteria, Filters, Operator } from '@ducen-services/shared';

export class SearchUserByIdCriteria extends Criteria {
  constructor(value: string) {
    super(
      Filters.fromValues([
        {
          field: 'id',
          operator: Operator.EQUAL,
          value,
        },
      ]),
    );
  }
}
