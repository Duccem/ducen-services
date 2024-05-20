import { Logger, MongoConnection } from '@ducen-services/shared';
import { MongoAppointmentRepository } from '../persistence/MongoAppointmentRepository';

export const appointmentRepositories = [
  {
    provide: 'APPOINTMENT_REPOSITORY',
    inject: ['DATABASE_CONNECTION', 'LOGGER_SERVICE'],
    useFactory: (connection: MongoConnection, logger: Logger) => new MongoAppointmentRepository(connection, logger),
  },
];
