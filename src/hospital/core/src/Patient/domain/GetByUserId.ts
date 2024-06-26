import { Criteria, FilterType, Operator } from '@ducen/shared';

export class GetByUserId extends Criteria {
  constructor(userId: string) {
    super({ filters: [{ field: 'userId', operator: Operator.EQUAL, value: userId }], type: FilterType.AND });
  }
}
