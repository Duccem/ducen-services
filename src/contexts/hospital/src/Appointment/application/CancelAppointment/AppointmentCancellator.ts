import { EventBus, NotFoundError } from '@ducen-services/shared';
import { AppointmentRepository } from '../../domain/AppointmentRepository';
import { AppointmentByIdCriteria } from '../../domain/Criteria/AppointmentByIdCriteria';

export class AppointmentCancellator {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly eventBus: EventBus,
  ) {}
  async run(appointmentId: string, cancelReason: string): Promise<void> {
    const appointment = await this.appointmentRepository.findOne(new AppointmentByIdCriteria(appointmentId));
    if (!appointment) {
      throw new NotFoundError(`The appointment <${appointmentId}> does not exist`);
    }
    appointment.cancel(cancelReason);
    await this.appointmentRepository.save(appointment);
    await this.eventBus.publish(appointment.pullDomainEvents());
  }
}
