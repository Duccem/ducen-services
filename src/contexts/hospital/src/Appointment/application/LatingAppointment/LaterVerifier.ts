import { CreatedAppointmentCriteria } from '@/Appointment/domain/CreatedAppointmentCriteria';
import { EventBus } from '@ducen-services/shared';
import { Appointment, AppointmentRepository } from '../../../..';

export class LaterVerifier {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(): Promise<void> {
    const appointments = await this.appointmentRepository.find(new CreatedAppointmentCriteria());

    if (appointments.length === 0) return;

    const actions = appointments.map((appointment) => this.processAppointment(appointment));
    await Promise.all(actions);
  }
  async processAppointment(appointment: Appointment) {
    if (appointment.isLate()) {
      appointment.setIsLate();
      await this.appointmentRepository.save(appointment);
      await this.eventBus.publish(appointment.pullDomainEvents());
    }
  }
}
