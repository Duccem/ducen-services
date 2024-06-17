import { Criteria, FilterType, Operator } from '@ducen-services/shared';

export class SearchUserByEmailCriteria extends Criteria {
  constructor(value: string) {
    super({ filters: [{ field: 'email', operator: Operator.EQUAL, value }], type: FilterType.AND });
  }
}
