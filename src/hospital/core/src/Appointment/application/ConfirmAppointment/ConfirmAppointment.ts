import { EventBus, NotFoundError } from '@ducen/shared';
import { AppointmentRepository } from '../../domain/AppointmentRepository';
import { AppointmentByIdCriteria } from '../../domain/Criteria/AppointmentByIdCriteria';

export class ConfirmAppointment {
  constructor(private readonly repository: AppointmentRepository, private readonly eventBus: EventBus) {}

  async run(appointmentId: string) {
    const appointment = await this.repository.findOne(new AppointmentByIdCriteria(appointmentId));
    if (!appointment) {
      throw new NotFoundError('Appointment not found');
    }
    appointment.confirm();
    await this.repository.save(appointment);
    await this.eventBus.publish(appointment.pullDomainEvents());
  }
}
