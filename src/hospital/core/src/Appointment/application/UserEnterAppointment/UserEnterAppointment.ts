import { EventBus, NotFoundError } from '@ducen/shared';
import { AppointmentRepository } from '../../../..';
import { AppointmentByIdCriteria } from '../../domain/Criteria/AppointmentByIdCriteria';

export class UserEnterAppointment {
  constructor(private readonly repository: AppointmentRepository, private readonly eventBus: EventBus) {}

  async run(appointmentId: string, whoEnter: 'PATIENT' | 'DOCTOR'): Promise<void> {
    const appointment = await this.repository.findOne(new AppointmentByIdCriteria(appointmentId));
    if (!appointment) throw new NotFoundError('Appointment not found');

    appointment.userWaiting(whoEnter);
    await this.repository.save(appointment);
    await this.eventBus.publish(appointment.pullDomainEvents());
  }
}
