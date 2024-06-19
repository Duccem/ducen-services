import { Criteria, FilterType, Operator } from '@ducen/shared';

export class GetByIdCriteria extends Criteria {
  constructor(public id: string) {
    super({ filters: [{ field: 'id', operator: Operator.EQUAL, value: id }], type: FilterType.AND });
  }
}
