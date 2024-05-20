import { EventBus, TaskHandler } from '@ducen-services/shared';
import { AppointmentRepository } from '../../../..';
import { MissAppointment } from './MissAppointment';

export class MissAppointmentEachTenMinutes implements TaskHandler {
  static readonly TIME = '*/10 * * * *';
  static readonly NAME = 'miss-appointment-each-ten-minutes';
  private useCase: MissAppointment;
  constructor(repository: AppointmentRepository, eventBus: EventBus) {
    this.useCase = new MissAppointment(repository, eventBus);
  }
  subscribedTo(): string {
    return 'miss-appointment-each-ten-minutes';
  }
  async handle(): Promise<void> {
    await this.useCase.run();
  }
}
