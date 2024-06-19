import { Logger, MongoConnection } from '@ducen/shared';
import { MongoDoctorRepository } from '../../../Doctor/infrastructure/persistence/MongoDoctorRepository';
import { MongoPatientRepository } from '../../../Patient/infrastructure/persistence/MongoPatientRepository';
import { MongoAppointmentRepository } from '../persistence/MongoAppointmentRepository';

export const appointmentRepositories = [
  {
    provide: 'APPOINTMENT_REPOSITORY',
    inject: ['DATABASE_CONNECTION', 'LOGGER_SERVICE'],
    useFactory: (connection: MongoConnection, logger: Logger) =>
      new MongoAppointmentRepository(connection, logger),
  },
  {
    provide: 'APPOINTMENT_PATIENT_REPOSITORY',
    inject: ['DATABASE_CONNECTION', 'LOGGER_SERVICE'],
    useFactory: (connection: MongoConnection, logger: Logger) =>
      new MongoPatientRepository(connection, logger),
  },
  {
    provide: 'APPOINTMENT_DOCTOR_REPOSITORY',
    inject: ['DATABASE_CONNECTION', 'LOGGER_SERVICE'],
    useFactory: (connection: MongoConnection, logger: Logger) =>
      new MongoDoctorRepository(connection, logger),
  },
];
