import { Criteria, Filter, FilterField, FilterOperator, FilterValue, Filters } from '@ducen-services/shared';

export class GetByIdCriteria extends Criteria {
  constructor(public id: string) {
    super(new Filters([new Filter(new FilterField('id'), FilterOperator.equal(), new FilterValue(id))]));
  }
}
