import { Query, QueryHandler } from '@ducen/shared';
import { AppointmentRepository } from '../../domain/AppointmentRepository';
import { ListPatientAppointments } from './ListPatientAppointments';
import { ListPatientAppointmentsQuery } from './ListPatientAppointmentsQuery';

export class ListPatientAppointmentsQueryHandler implements QueryHandler<ListPatientAppointmentsQuery> {
  private useCase: ListPatientAppointments;
  constructor(repository: AppointmentRepository) {}

  subscribedTo(): Query {
    return ListPatientAppointmentsQuery;
  }

  public async handle(query: ListPatientAppointmentsQuery): Promise<any> {
    return this.useCase.run(query.patientId, query.limit, query.offset);
  }
}
