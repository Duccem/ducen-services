import { AppointmentByIdCriteria } from '@/Appointment/domain/Criteria/AppointmentByIdCriteria';
import { EventBus } from '@ducen-services/shared';
import { AppointmentRepository } from '../../domain/AppointmentRepository';

export class StartAppointment {
  constructor(
    private readonly repository: AppointmentRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(appointmentId: string): Promise<void> {
    const appointment = await this.repository.findOne(new AppointmentByIdCriteria(appointmentId));
    appointment.start();
    await this.repository.save(appointment);
    await this.eventBus.publish(appointment.pullDomainEvents());
  }
}
