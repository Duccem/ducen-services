import { Criteria, Filter, FilterField, FilterOperator, FilterValue, Filters, Uuid } from '@ducen-services/shared';

export class GetVaccinesByPatientIdCriteria extends Criteria {
  constructor(patientId: Uuid) {
    super(
      new Filters([
        new Filter(new FilterField('patientId'), FilterOperator.equal(), new FilterValue(patientId.toString())),
      ]),
    );
  }
}
