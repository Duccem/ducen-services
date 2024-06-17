import { Criteria, FilterType, Operator } from '@ducen-services/shared';
import { AppointmentStatuses } from '../members/AppointmentStatus';

export class SearchByStatusesCriteria extends Criteria {
  constructor(statuses: AppointmentStatuses[]) {
    super({
      filters: statuses.map((status) => ({ field: 'status', operator: Operator.EQUAL, value: status })),
      type: FilterType.OR,
    });
  }
}
