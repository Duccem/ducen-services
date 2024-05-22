import { Command } from '@ducen-services/shared';

export class ConfirmAppointmentCommand extends Command {
  constructor(public appointmentId: string) {
    super();
  }
}
