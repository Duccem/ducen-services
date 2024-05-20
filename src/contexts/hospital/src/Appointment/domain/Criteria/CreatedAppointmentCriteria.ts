import { Criteria, Filter, Operator, OrFilters } from '@ducen-services/shared';
import { AppointmentStatuses } from '../members/AppointmentStatus';

export class CreatedAppointmentCriteria extends Criteria {
  constructor() {
    super(
      new OrFilters([
        Filter.fromPrimitives('status', Operator.EQUAL, AppointmentStatuses.SCHEDULED),
        Filter.fromPrimitives('status', Operator.EQUAL, AppointmentStatuses.RESCHEDULED),
      ]),
    );
  }
}
