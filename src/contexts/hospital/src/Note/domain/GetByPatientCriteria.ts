import { Criteria, FilterType, Operator } from '@ducen-services/shared';

export class GetByPatientCriteria extends Criteria {
  constructor(patientId: string) {
    super({
      filters: [{ field: 'patientId', operator: Operator.EQUAL, value: patientId }],
      type: FilterType.AND,
    });
  }
}
