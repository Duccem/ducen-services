import { EventBus, Task, TaskHandler } from '@ducen-services/shared';
import { AppointmentRepository } from '../../../..';
import { MissAppointment } from './MissAppointment';
import { MissAppointmentTask } from './MissAppointmentTask';

export class MissAppointmentEachTenMinutes implements TaskHandler<MissAppointmentTask> {
  private useCase: MissAppointment;
  constructor(repository: AppointmentRepository, eventBus: EventBus) {
    this.useCase = new MissAppointment(repository, eventBus);
  }
  subscribedTo(): Task {
    return MissAppointmentTask;
  }
  async handle(): Promise<void> {
    await this.useCase.run();
  }
}
