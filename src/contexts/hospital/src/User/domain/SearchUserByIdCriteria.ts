import { Criteria, FilterType, Operator } from '@ducen-services/shared';

export class SearchUserByIdCriteria extends Criteria {
  constructor(value: string) {
    super({ filters: [{ field: 'id', operator: Operator.EQUAL, value }], type: FilterType.AND });
  }
}
