import { Command } from '@ducen-services/shared';

export class StartAppointmentCommand extends Command {
  constructor(public readonly appointmentId: string) {
    super();
  }
}
