import { Criteria, Filter, Filters, Operator } from '@ducen-services/shared';

export class AppointmentByIdCriteria extends Criteria {
  constructor(appointmentId: string) {
    super(new Filters([Filter.fromPrimitives('id', Operator.EQUAL, appointmentId)]));
  }
}
