import { Command } from '@ducen/shared';

export class StartAppointmentCommand extends Command {
  constructor(public readonly appointmentId: string) {
    super();
  }
}
