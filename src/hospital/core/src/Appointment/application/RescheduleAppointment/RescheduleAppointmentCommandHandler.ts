import { Command, CommandHandler, EventBus } from '@ducen/shared';
import { AppointmentRepository } from '../../../..';
import { AppointmentRescheduler } from './AppointmentRescheduler';
import { RescheduleAppointmentCommand } from './RescheduleAppointmentCommand';

export class RescheduleAppointmentCommandHandler implements CommandHandler<RescheduleAppointmentCommand> {
  private rescheduler: AppointmentRescheduler;
  constructor(repository: AppointmentRepository, eventBus: EventBus) {
    this.rescheduler = new AppointmentRescheduler(repository, eventBus);
  }

  subscribedTo(): Command {
    return RescheduleAppointmentCommand;
  }

  public async handle(command: RescheduleAppointmentCommand): Promise<void> {
    await this.rescheduler.run(command.appointmentId, command.initDate, command.endDate);
  }
}
