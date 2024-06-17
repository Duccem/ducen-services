import { Criteria, Direction, FilterType, Operator } from '@ducen-services/shared';

export class ByPatientIdCriteria extends Criteria {
  constructor(patientId: string, limit: number, offset: number) {
    super(
      {
        filters: [{ field: 'patientId', value: patientId, operator: Operator.EQUAL }],
        type: FilterType.AND,
      },
      { order: Direction.ASC, field: 'initDate' },
      { limit, offset },
    );
  }
}
