import { Criteria, FilterType, Operator, Uuid } from '@ducen-services/shared';

export class GetTreatmentByPatientIdCriteria extends Criteria {
  constructor(patientId: Uuid) {
    super({
      filters: [{ field: 'patientId', operator: Operator.EQUAL, value: patientId }],
      type: FilterType.AND,
    });
  }
}
