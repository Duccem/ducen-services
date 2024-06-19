import { Command, CommandHandler, EventBus } from '@ducen/shared';
import { AppointmentRepository } from '../../domain/AppointmentRepository';
import { ConfirmAppointment } from './ConfirmAppointment';
import { ConfirmAppointmentCommand } from './ConfirmAppointmentCommand';

export class ConfirmAppointmentCommandHandler implements CommandHandler<ConfirmAppointmentCommand> {
  private useCase: ConfirmAppointment;
  constructor(repository: AppointmentRepository, eventBus: EventBus) {
    this.useCase = new ConfirmAppointment(repository, eventBus);
  }

  subscribedTo(): Command {
    return ConfirmAppointmentCommand;
  }

  public async handle(command: ConfirmAppointmentCommand): Promise<void> {
    await this.useCase.run(command.appointmentId);
  }
}
