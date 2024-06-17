import { Criteria, FilterType, Operator } from '@ducen-services/shared';
import { AppointmentStatuses } from '../members/AppointmentStatus';

export class CreatedAppointmentCriteria extends Criteria {
  constructor() {
    super({
      filters: [
        { field: 'status', operator: Operator.EQUAL, value: AppointmentStatuses.SCHEDULED },
        { field: 'status', operator: Operator.EQUAL, value: AppointmentStatuses.RESCHEDULED },
      ],
      type: FilterType.OR,
    });
  }
}
