import { Command } from '@ducen/shared';

export class CancelAppointmentCommand extends Command {
  constructor(public readonly appointmentId: string, public readonly reason: string) {
    super();
  }
}
