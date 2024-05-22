import { Provider } from '@nestjs/common';
import { ListPatientAppointmentsQueryHandler } from '../../application/ListPatientAppointments/ListPatientAppointmentsQueryHandler';

export const queryHandlers: Provider[] = [
  {
    provide: ListPatientAppointmentsQueryHandler,
    inject: ['APPOINTMENT_REPOSITORY'],
    useFactory: (repository) => new ListPatientAppointmentsQueryHandler(repository),
  },
];
