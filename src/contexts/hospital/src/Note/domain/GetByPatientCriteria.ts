import { Criteria, Filter, FilterField, FilterOperator, FilterValue, Filters } from '@ducen-services/shared';

export class GetByPatientCriteria extends Criteria {
  constructor(patientId: string) {
    super(new Filters([new Filter(new FilterField('patientId'), FilterOperator.equal(), new FilterValue(patientId))]));
  }
}
