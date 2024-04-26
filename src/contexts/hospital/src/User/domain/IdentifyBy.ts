import { Criteria, Filter, FilterField, FilterOperator, FilterValue, Filters, Operator } from '@ducen-services/shared';

export class IdentifyBy extends Criteria {
  constructor(field: string, value: string) {
    super(
      new Filters([new Filter(new FilterField(field), new FilterOperator(Operator.EQUAL), new FilterValue(value))])
    );
  }
}
