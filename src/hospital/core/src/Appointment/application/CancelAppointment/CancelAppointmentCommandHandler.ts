import { Command, CommandHandler, EventBus } from '@ducen/shared';
import { AppointmentRepository } from '../../../..';
import { AppointmentCancellator } from './AppointmentCancellator';
import { CancelAppointmentCommand } from './CancelAppointmentCommand';

export class CancelAppointmentCommandHandler implements CommandHandler<CancelAppointmentCommand> {
  private cancellator: AppointmentCancellator;
  constructor(appointmentRepository: AppointmentRepository, eventBus: EventBus) {
    this.cancellator = new AppointmentCancellator(appointmentRepository, eventBus);
  }

  subscribedTo(): Command {
    return CancelAppointmentCommand;
  }

  public async handle(command: CancelAppointmentCommand): Promise<void> {
    await this.cancellator.run(command.appointmentId, command.reason);
  }
}
