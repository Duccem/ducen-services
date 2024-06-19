import { Command, CommandHandler, EventBus } from '@ducen/shared';
import { AppointmentRepository } from '../../../..';
import { FinishAppointment } from './FinishAppointment';
import { FinishAppointmentCommand } from './FinishAppointmentCommand';

export class FinishAppointmentCommandHandler implements CommandHandler<FinishAppointmentCommand> {
  private useCase: FinishAppointment;
  constructor(repository: AppointmentRepository, eventBus: EventBus) {
    this.useCase = new FinishAppointment(repository, eventBus);
  }

  subscribedTo(): Command {
    return FinishAppointmentCommand;
  }

  public async handle(command: FinishAppointmentCommand): Promise<void> {
    await this.useCase.run(command.appointmentId);
  }
}
