import { AppointmentByIdCriteria } from '@/Appointment/domain/Criteria/AppointmentByIdCriteria';
import { EventBus, NotFoundError } from '@ducen-services/shared';
import { AppointmentRepository } from '../../../..';

export class UserEnterAppointment {
  constructor(
    private readonly repository: AppointmentRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(appointmentId: string, whoEnter: 'PATIENT' | 'DOCTOR'): Promise<void> {
    const appointment = await this.repository.findOne(new AppointmentByIdCriteria(appointmentId));
    if (!appointment) throw new NotFoundError('Appointment not found');

    appointment.userWaiting(whoEnter);
    await this.repository.save(appointment);
    await this.eventBus.publish(appointment.pullDomainEvents());
  }
}
