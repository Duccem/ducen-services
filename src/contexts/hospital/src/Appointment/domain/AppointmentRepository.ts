import { Criteria, Nullable } from '@ducen-services/shared';
import { Appointment } from './Appointment';

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  find(criteria: Criteria): Promise<Appointment[]>;
  findOne(criteria: Criteria): Promise<Nullable<Appointment>>;
}
