import { Command } from '@ducen-services/shared';

export class CancelAppointmentCommand extends Command {
  constructor(
    public readonly appointmentId: string,
    public readonly reason: string,
  ) {
    super();
  }
}
