import { Criteria, Filter, Filters, Operator, Order, Paginator } from '@ducen-services/shared';

export class ByPatientIdCriteria extends Criteria {
  constructor(patientId: string, limit: number, offset: number) {
    super(
      new Filters([Filter.fromPrimitives('patientId', Operator.EQUAL, patientId)]),
      Order.fromValues('initDate', 'ASC'),
      Paginator.fromValues(limit, offset),
    );
  }
}
