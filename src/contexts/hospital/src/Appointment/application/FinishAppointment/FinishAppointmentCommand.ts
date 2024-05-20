import { Command } from '@ducen-services/shared';

export class FinishAppointmentCommand extends Command {
  constructor(public readonly appointmentId: string) {
    super();
  }
}
