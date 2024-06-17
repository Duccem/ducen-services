import { Criteria, FilterType, Operator } from '@ducen-services/shared';

export class GetById extends Criteria {
  constructor(id: string) {
    super({ filters: [{ field: 'id', operator: Operator.EQUAL, value: id }], type: FilterType.AND });
  }
}
