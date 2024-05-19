import { Criteria, EventBus, NotFoundError } from '@ducen-services/shared';
import { AppointmentRepository } from '../../../..';

export class AppointmentRescheduler {
  constructor(
    private readonly repository: AppointmentRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(appointmentId: string, initDate: Date, endDate: Date): Promise<void> {
    const appointment = await this.repository.findOne(
      Criteria.fromValues([{ field: 'id', value: appointmentId, operator: '=' }]),
    );
    if (!appointment) {
      throw new NotFoundError('Appointment not found');
    }
    appointment.reschedule(initDate, endDate);
    await this.repository.save(appointment);
    this.eventBus.publish(appointment.pullDomainEvents());
  }
}
