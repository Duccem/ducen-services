import { Command, CommandHandler, EventBus } from '@ducen/shared';
import { AppointmentRepository } from '../../domain/AppointmentRepository';
import { StartAppointment } from './StartAppointment';
import { StartAppointmentCommand } from './StartAppointmentCommand';

export class StartAppointmentCommandHandler implements CommandHandler<StartAppointmentCommand> {
  private useCase: StartAppointment;
  constructor(repository: AppointmentRepository, eventBus: EventBus) {
    this.useCase = new StartAppointment(repository, eventBus);
  }

  subscribedTo(): Command {
    return StartAppointmentCommand;
  }

  public async handle(command: StartAppointmentCommand): Promise<void> {
    await this.useCase.run(command.appointmentId);
  }
}
