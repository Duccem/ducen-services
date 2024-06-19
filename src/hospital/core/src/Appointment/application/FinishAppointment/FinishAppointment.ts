import { EventBus } from '@ducen/shared';
import { AppointmentRepository } from '../../../..';
import { AppointmentByIdCriteria } from '../../domain/Criteria/AppointmentByIdCriteria';

export class FinishAppointment {
  constructor(private readonly repository: AppointmentRepository, private readonly eventBus: EventBus) {}

  async run(appointmentId: string): Promise<void> {
    const appointment = await this.repository.findOne(new AppointmentByIdCriteria(appointmentId));
    appointment.finish();
    await this.repository.save(appointment);
    await this.eventBus.publish(appointment.pullDomainEvents());
  }
}
