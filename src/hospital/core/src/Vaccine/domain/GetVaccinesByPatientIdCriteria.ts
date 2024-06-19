import { Criteria, FilterType, Operator, Uuid } from '@ducen/shared';

export class GetVaccinesByPatientIdCriteria extends Criteria {
  constructor(patientId: Uuid) {
    super({
      filters: [{ field: 'patientId', operator: Operator.EQUAL, value: patientId }],
      type: FilterType.AND,
    });
  }
}
