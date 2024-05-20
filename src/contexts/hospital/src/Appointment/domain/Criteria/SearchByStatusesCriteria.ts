import { Criteria, Filter, Operator, OrFilters } from '@ducen-services/shared';
import { AppointmentStatuses } from '../members/AppointmentStatus';

export class SearchByStatusesCriteria extends Criteria {
  constructor(statuses: AppointmentStatuses[]) {
    super(new OrFilters(statuses.map((status) => Filter.fromPrimitives('status', Operator.EQUAL, status))));
  }
}
