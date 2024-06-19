import { EventBus } from '@ducen/shared';
import { Appointment } from '../../domain/Appointment';
import { AppointmentRepository } from '../../domain/AppointmentRepository';
import { SearchByStatusesCriteria } from '../../domain/Criteria/SearchByStatusesCriteria';
import { AppointmentStatuses } from '../../domain/members/AppointmentStatus';

export class MissAppointment {
  constructor(private readonly repository: AppointmentRepository, private readonly eventBus: EventBus) {}

  async run(): Promise<void> {
    const appointments = await this.repository.find(
      new SearchByStatusesCriteria([AppointmentStatuses.LATE, AppointmentStatuses.WAITING_PATIENT])
    );
    if (appointments.length === 0) return;

    const actions = appointments.map((appointment) => this.processAppointment(appointment));
    await Promise.all(actions);
  }
  async processAppointment(appointment: Appointment) {
    if (appointment.isMissed()) {
      appointment.miss();
      await this.repository.save(appointment);
      await this.eventBus.publish(appointment.pullDomainEvents());
    }
  }
}
