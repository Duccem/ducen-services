import { Criteria, FilterType, Operator } from '@ducen-services/shared';

export class AppointmentByIdCriteria extends Criteria {
  constructor(appointmentId: string) {
    super({
      filters: [{ field: 'id', value: appointmentId, operator: Operator.EQUAL }],
      type: FilterType.AND,
    });
  }
}
