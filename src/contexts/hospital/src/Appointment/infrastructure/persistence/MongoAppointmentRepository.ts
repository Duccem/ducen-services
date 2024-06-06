import { Criteria, Logger, MongoConnection, MongoRepository, Primitives } from '@ducen-services/shared';
import { Appointment } from '../../domain/Appointment';
import { AppointmentRepository } from '../../domain/AppointmentRepository';
import { MongoAppointmentSchema } from './MongoAppointmentSchema';

export class MongoAppointmentRepository extends MongoRepository<Appointment> implements AppointmentRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(Appointment, connection, logger);
  }
  get schema() {
    return MongoAppointmentSchema;
  }
  async save(appointment: Appointment): Promise<void> {
    await this.persist(appointment.id.toString(), appointment);
  }
  async find(criteria: Criteria): Promise<Appointment[]> {
    const appointments = await this.searchByCriteria(criteria);
    return appointments.map((appointment) => Appointment.fromPrimitives(appointment));
  }
  async findOne(criteria: Criteria): Promise<Appointment> {
    const { filter } = this.converter.criteria(criteria);
    const appointment = await this.collection.findOne<Primitives<Appointment>>(filter);
    return appointment ? Appointment.fromPrimitives(appointment) : null;
  }
}
