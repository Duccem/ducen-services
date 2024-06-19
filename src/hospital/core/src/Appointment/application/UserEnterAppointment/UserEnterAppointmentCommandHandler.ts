import { Command, CommandHandler, EventBus } from '@ducen/shared';
import { AppointmentRepository } from '../../../..';
import { UserEnterAppointment } from './UserEnterAppointment';
import { UserEnterAppointmentCommand } from './UserEnterAppointmentCommand';

export class UserEnterAppointmentCommandHandler implements CommandHandler<UserEnterAppointmentCommand> {
  private useCase: UserEnterAppointment;
  constructor(repository: AppointmentRepository, eventBus: EventBus) {
    this.useCase = new UserEnterAppointment(repository, eventBus);
  }

  subscribedTo(): Command {
    return UserEnterAppointmentCommand;
  }

  public async handle(command: UserEnterAppointmentCommand): Promise<void> {
    this.useCase.run(command.appointmentId, command.whoEnter);
  }
}
