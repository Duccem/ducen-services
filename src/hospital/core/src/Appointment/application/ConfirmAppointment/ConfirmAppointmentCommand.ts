import { Command } from '@ducen/shared';

export class ConfirmAppointmentCommand extends Command {
  constructor(public appointmentId: string) {
    super();
  }
}
